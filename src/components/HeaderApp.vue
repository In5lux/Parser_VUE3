<script setup lang="ts">
import { ref, computed } from 'vue';
import { dateFormat } from '../methods/dateFormat';
import { useItemsStore } from '../stores/items';
import { socket } from '../socket';
import { CONFIG } from '../config/config';
import ProgressBar from './ProgressBar.vue';

const itemsList = useItemsStore();

const { HOST, PORT } = CONFIG;

type ISearchParams = Record<string, string>;

const initDates = computed(() => {
  return {
    date: dateFormat(new Date()),
    searchDate: dateFormat(new Date()).split('-').reverse().join('.')
  };
});

const emit = defineEmits(['send-stop-word', 'stop-word-editor']);

const date = ref(initDates.value.date);
const searchDate = ref(initDates.value.searchDate);

const customer = ref<string | null>();
const desc = ref<string | null>();
const lastUpTime = ref<string>();
const statusCurrent = ref<string>();
const isError = ref(false);
const executor = ref<string>();
const maxProgress = ref(0);
const parsingProgress = ref(0);
const message = ref<string | null>();

defineExpose({message});

function parse() {
  isError.value = false;
  socket.emit('send mess', 'Start parsing');
  const searchParams: ISearchParams = {
    date: searchDate.value
  };
  if (customer.value) searchParams.client = customer.value;
  fetch(
    HOST + ':' + PORT + '/parse?' + new URLSearchParams(searchParams).toString()
  ).catch((error) => {
    isError.value = true;
    statusCurrent.value = 'Нет ответа сервера';
    console.error(
      lastUpTime.value + ' ' + statusCurrent.value + ' ' + error.message
    );
  });
}

async function search() {
  isError.value = false;
  const searchParams: ISearchParams = {};

  document.querySelector('.start-msg')?.remove();

  if (desc.value) {
    searchParams.desc = desc.value;
  } else if (customer.value) {
    searchParams.client = customer.value;
  } else {
    searchParams.date = date.value.split('-').reverse().join('.');
  }

  fetch(HOST + ':' + PORT + '/search?' + new URLSearchParams(searchParams).toString(),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
    .then(async (res) => {
      let result = JSON.parse(await res.text());
      if (result.items) {
        itemsList.setItems(result.items); // Store
        message.value = null;
      }
      if (result.message) {
        itemsList.setItems(null);
        message.value = result.message;
      }
    })
    .catch((error) => {
      isError.value = true;
      statusCurrent.value = 'Нет ответа сервера';
      console.error(
        lastUpTime.value + ' ' + statusCurrent.value + ' ' + error.message
      );
    });
}

function dateChange(event: Event) {
  isError.value = false;
  desc.value = null;
  customer.value = null;
  document.querySelector('.start-msg')?.remove();
  const value = (event.target as HTMLInputElement).value;
  date.value = value;
  localStorage.setItem('date', value);
  const dateSearch = (event.target as HTMLInputElement).value
    .split('-')
    .reverse()
    .join('.');
  searchDate.value = dateSearch;
  localStorage.setItem('searchDate', dateSearch);

  fetch(`${HOST}:${PORT}/search?date=${dateSearch}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(async (res) => {
      let result = JSON.parse(await res.text());
      if (result.items) {
        itemsList.setItems(result.items); // Store
        message.value = null;
      }
      if (result.message) {
        itemsList.setItems(null);
        message.value = result.message;
      }
    })
    .catch((error) => {
      isError.value = true;
      statusCurrent.value = 'Нет ответа сервера';
      console.error(
        lastUpTime.value + ' ' + statusCurrent.value + ' ' + error.message
      );
    });
}

async function addStopWord() {
  const searchParams: ISearchParams = {};
  if (desc.value) {
    searchParams.desc = desc.value;
  } else if (customer.value) {
    searchParams.client = customer.value;
  } else {
    searchParams.date = date.value.split('-').reverse().join('.');
  }
  const stopWords = getSelection()?.toString().trim();  
  
  if (stopWords) {
    let response = await fetch(`${HOST}:${PORT}/stopwords`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([stopWords])
    });
    let result = (await response.text()).replace(/\'/g, '"');
        
    emit('send-stop-word', result);

    fetch(HOST + ':' + PORT + '/search?' + new URLSearchParams(searchParams).toString(),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(async (res) => {
        let result = JSON.parse(await res.text());
        if (result.items) {
          itemsList.setItems(result.items);
          message.value = null;
        }
        if (result.message) {
          itemsList.setItems(null);
          message.value = result.message;
        }        
      })
      .catch((error) => {
        isError.value = true;
        statusCurrent.value = 'Нет ответа сервера';
        console.error(
          lastUpTime.value + ' ' + statusCurrent.value + ' ' + error.message
        );
      });
  } else {
    emit('send-stop-word', 'Не выделено слово для добавления в список стоп-слов');    
  }    
}

function stopWordEditor() {  
  
  fetch(HOST + ':' + PORT + '/stopwords', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (res) => {
    let result = JSON.parse(await res.text());    
    emit('stop-word-editor', result);
  });  
}

socket.on('connect', () => {
  socket.emit('send mess', 'Connected');
});

socket.on('add mess', async function (data) {
  const { lastUpdateTime, status } = await data;
  lastUpTime.value = lastUpdateTime;
  statusCurrent.value = status;
  if (statusCurrent.value == 'Выполнено') parsingProgress.value++;
});
socket.on('executor', async function (data) {
  const d = await JSON.parse(data);
  executor.value = `${d.name} ${d.index + 1}/${d.length}`;
  maxProgress.value = d.length;
  parsingProgress.value = d.index;
});
</script>

<template>
  <header>
    <form :class="{ error: isError }">
      <input
        type="date"
        v-bind:value="date"
        v-on:change="dateChange"
        aria-label="date"
      />
      <input
        v-model="customer"
        type="text"
        placeholder="Поиск по заказчику"
        aria-label="Customer search"
      />
      <input
        v-model="desc"
        type="text"
        placeholder="Поиск в описании"
        aria-label="Description search"
      />
      <button id="search" v-on:click.prevent="search">Искать</button>
      <button id="parse" v-on:click.prevent="parse">Обновить</button>
      <span class="msg" v-if="isError == true"
        >Ошибка: {{ statusCurrent }}</span
      >
      <span
        class="msg"
        v-if="isError == false"
        v-bind:title="statusCurrent == 'Парсинг' ? executor : undefined"
        >Последнее обновление: {{ lastUpTime }} {{ statusCurrent }}
      </span>
      <button
        class="stop-word"
        v-on:click.exact.prevent="addStopWord"
        v-on:click.prevent.alt.exact="stopWordEditor"
      >
        <img
          src="../assets/img/stop.svg"
          width="20"
          height="20"
          title="Добавление стоп-слова в базу"
          alt="добавить стоп слово"
        />
      </button>
    </form>
    <ProgressBar :value="parsingProgress" :max="maxProgress" />
  </header>
</template>

<style scoped>
header {
  background: linear-gradient(
    0deg,
    rgba(0, 212, 255, 1) 0%,
    rgba(9, 115, 121, 1) 50%,
    rgba(0, 212, 255, 1) 100%
  );
  box-shadow: 0px 0px 20px darkslategray;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
}

form {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  flex-wrap: wrap;
  padding-left: 15px;
}

.stop-word {
  background: none;
  border-radius: 5px;
  border: 1px solid rgb(12, 0, 124);
  width: 42px;
}

.stop-word img {
  display: block;
  margin: auto;
}

.stop-word:hover {
  cursor: pointer;
  background: none;
  background-color: rgb(12, 0, 124, 0.1);
}

.msg {
  color: #fff;
  margin: 10px;
}

.error {
  background: linear-gradient(
    0deg,
    rgb(255, 145, 0) 0%,
    rgb(255, 0, 0) 50%,
    rgb(255, 245, 100) 100%
  );
  color: #fff;
}
</style>
../helpers/dateFormat