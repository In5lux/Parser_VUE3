<script setup lang="ts">
import { ref } from 'vue';
import HeaderApp from '@/components/HeaderApp.vue';
import ItemCard from '@/components/ItemCard.vue';
import SearchMessage from '@/components/SearchMessage.vue';
import InformerMessage from '@/components/InformerMessage.vue';
import StopwordsEditor from '@/components/StopwordsEditor.vue';
import { useItemsStore } from './stores/items';
import { CONFIG } from './config/config';

type Message = { message: string } | null;

const { HOST, PORT } = CONFIG;

const itemsList = useItemsStore();

const isActive = ref(false);
const isStopwordsEditor = ref(false);
const informerMsg = ref<string>();
const stopwordsList = ref<string[]>();

const props = ref<Message>();

// const Scroll = inject<Record<'hideScroll' | 'setScroll', Function>>('Scroll');

function stopWordDelete(index: number): void {
  fetch(HOST + ':' + PORT + '/stopwords', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify([index])
  }).then(async (res) => {
    let result = JSON.parse(await res.text());
    stopwordsList.value = result;
  });
}

const showInfo = (msg: string): void => {
  if (msg) {
    informerMsg.value = msg;
    isActive.value = true;
  }
  // Scroll && Scroll.hideScroll();
};

const openStopwordsEditor = (wordsList: string[]): void => {
  if (wordsList) {
    stopwordsList.value = wordsList;
    isStopwordsEditor.value = true;
  }
  // Scroll && Scroll.hideScroll();
};

const closeInfo = (): void => {
  if (isActive.value && !isStopwordsEditor.value) {
    isActive.value = false;
  }
  // Scroll && Scroll.setScroll();
};

const closeStopwordsEditor = (): void => {
  if (!isActive.value && isStopwordsEditor.value) {
    isStopwordsEditor.value = false;
  }
  // Scroll && Scroll.setScroll();
};
</script>

<template>
  <!-- <HeaderApp
    ref="props"
    @send-stop-word="showInfo"
    @stop-word-editor="openStopwordsEditor"
    :disable="isStopwordsEditor"
  /> -->
  <HeaderApp
    ref="props"
    @send-stop-word="
      (msg) => {
        $hideScroll();
        showInfo(msg);
      }
    "
    @stop-word-editor="
      (wordsList) => {
        $hideScroll();
        openStopwordsEditor(wordsList);
      }
    "
    :disable="isStopwordsEditor"
  />
  <main
    v-on:click.exact="$setScroll(), closeInfo()"
    v-on:click.ctrl.exact="$setScroll(), closeStopwordsEditor()"
  >
    <SearchMessage v-if="props?.message" :message="props.message" />
    <SearchMessage
      v-else-if="!props?.message && !itemsList.items?.length"
      :message="'Необходимо выбрать параметры поиска'"
    />
    <template v-for="item in itemsList.items" :key="item.number">
      <ItemCard @send-mail="$hideScroll, showInfo" :item="item" />
    </template>
    <InformerMessage v-if="isActive" :informerMsg="informerMsg" />
    <StopwordsEditor
      v-if="isStopwordsEditor"
      :stopwordsList="stopwordsList"
      @stop-word-delete="stopWordDelete"
    />
  </main>
</template>

<style scoped>
@import url('./assets/main.css');
</style>
