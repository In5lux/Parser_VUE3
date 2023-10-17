import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ItemCard from '../ItemCard.vue';

const item = {
  number: '№ 32312641746',
  type: 'Запрос котировок в электронной форме для СМСП',
  customer: 'ГАУ НО ЦИТ',
  description:
    'приобретение права на использование программного обеспечения (неисключительная лицензия) компании "Лаборатория Касперского Kaspersky Security для виртуальных и облачных сред',
  price: '2 093 800',
  published: '03.08.2023',
  end: '10.08.2023',
  link: 'https://etpgpb.ru/procedure/tender/etp/823083-priobretenie-prava-na-ispolzovanie-programmnogo-obespecheniya-neisklyuchitelnaya-litsenziya-kompanii-laboratoriya-kasperskogo-kaspersky-security-dlya-virtualnyh-i-oblachnyh-sred/',
  query: 'Обеспечение авиационными билетами'
};

describe('RenderItems', () => {
  it('renders properly items', () => {
    const wrapper = mount(ItemCard, { props: { item } });

    const html = wrapper.html();

    expect(html).toContain(item.number);
    expect(html).toContain(item.type);
    expect(html).toContain(item.customer);
    expect(html).toContain(item.description);
    expect(html).toContain(item.price);
    expect(html).toContain(item.published);
    expect(html).toContain(item.end);
    expect(html).toContain(item.link);
  });
});
