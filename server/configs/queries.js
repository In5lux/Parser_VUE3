const QUERIES = {
  default: [
    'Оказания услуг по бронированию, оформлению, продаже, обмену и возврату авиабилетов',
    'Организация командировок',
    'Организация деловых поездок',
    'Командировки',
    'Служебных поездок',
    'Выдворение',
    'Перевозок департируемых',
    'Проездных документов ',
    'Бронирование билетов',
    'Оформление авиабилетов',
    'Авиационных билетов',
    'Железнодорожных билетов',
    'Служебных командировок',
    'Служебных командирований',
    'Служебных командировок',
    'Гостиничные услуги',
    'Проживание экипажей',
    'Обеспечение авиабилетами',
    'Обеспечение авиационными билетами',
    'Организации воздушных перевозок',
    'Перевозкам воздушным транспортом',
    'Бронирование мест на авиарейсы, оформлению и продаже авиабилетов',
    'Пассажирские авиаперевозки иностранных граждан',
    'Оказание услуг связанных с бронированием',
    'Оказание услуг по реализации авиа, ж/д билетов',
    'Оказание услуг по организации командирования',
    'Билетного аутсорсинга',
    'Деловых мероприятий',
    'Протокольных мероприятий',
    'Безденежному оформлению и предоставлению',
    'Организации перевозок по территории РФ',
    'Транспортно экспедиторское обслуживание',
    'Бронированию мест размещения'
  ],
  Rosatom: [
    'Деловых поездок',
    'Проездных документов',
    'Служебных поездок',
    'Авиабилетов',
    'Авиационных билетов',
    'Организации воздушных перевозок',
    'Перевозкам воздушным транспортом',
    'Железнодорожных билетов',
    'Служебных командировок',
    'Командированию сотрудников',
    'Командирований',
    'Оказание услуг по организации командирования',
    'Транспортного обслуживания',
    'Протокольных мероприятий',
    'Билетного аутсорсинга'
  ],
  Fabrikant: [
    'Оказания услуг по бронированию, оформлению, продаже, обмену и возврату авиабилетов',
    'Организация командировок',
    'Организация деловых поездок',
    'Служебных поездок',
    'Выдворение',
    'Перевозок департируемых',
    'Проездных документов ',
    'Бронирование билетов',
    'Оформление авиабилетов',
    'Организации воздушных перевозок',
    'Перевозкам воздушным транспортом',
    'Служебных командирований',
    'Командированию сотрудников',
    'Служебных командировок',
    'Проживание экипажей',
    'Обеспечение авиабилетами',
    'Обеспечение авиационными билетами',
    'Пассажирские авиаперевозки иностранных граждан',
    'Оказание услуг связанных с бронированием',
    'Оказание услуг по организации командирования',
    'Билетного аутсорсинга'
  ],
  EtpEts: [
    'Оказания услуг по бронированию, оформлению, продаже, обмену и возврату авиабилетов',
    'Организация командировок',
    'Организация деловых поездок',
    'Служебных поездок',
    'Выдворение',
    'Перевозок департируемых',
    'Проездных документов ',
    // 'Бронирование билетов',
    'Оформление авиабилетов',
    'Авиационных билетов',
    'Организации воздушных перевозок',
    'Перевозкам воздушным транспортом',
    'Железнодорожных билетов',
    'Служебных командировок',
    'Командированию сотрудников',
    'Гостиничные услуги',
    'Проживание экипажей',
    'Обеспечение авиабилетами',
    'Обеспечение авиационными билетами',
    'Бронирование мест на авиарейсы, оформлению и продаже авиабилетов',
    'Пассажирские авиаперевозки иностранных граждан',
    'Оказание услуг связанных с бронированием',
    'Оказание услуг по реализации авиа, ж/д билетов',
    'Оказание услуг по организации командирования'
  ],
  ZakazRF: [
    'Оказания услуг по бронированию, оформлению, продаже, обмену и возврату авиабилетов',
    'Организация командировок',
    'Организация деловых поездок',
    'Служебных поездок',
    'Выдворение',
    'Проездных документов ',
    'Бронирование билетов',
    'Оформление авиабилетов',
    'Авиационных билетов',
    'Организации воздушных перевозок',
    'Перевозкам воздушным транспортом',
    'Железнодорожных билетов',
    'Служебных командировок',
    'Служебных командирований',
    'Служебных командировок',
    'Обеспечение авиабилетами',
    'Обеспечение авиационными билетами',
    'Бронирование мест на авиарейсы, оформлению и продаже авиабилетов',
    'Пассажирские авиаперевозки иностранных граждан',
    'Оказание услуг связанных с бронированием',
    'Оказание услуг по реализации авиа, ж/д билетов',
    'Оказание услуг по организации командирования',
    'Деловых мероприятий',
    'Протокольных мероприятий',
    'Билетного аутсорсинга'
  ],
  Roseltorg: [
    'Авиационным транспортом',
    'Авиабилетов',
    'Деловых поездок',
    'Служебных поездок',
    'Выдворение',
    'Бронирование билетов',
    'Авиационных билетов',
    'Железнодорожных билетов',
    'Командировок',
    'Командирований',
    'Обеспечение авиационными билетами',
    'Авиаперевозки',
    'Билетного аутсорсинга',
    'Безденежному оформлению и предоставлению'
  ],
  SberbankAst: [
    'Организация командировок',
    'Организация деловых поездок',
    'Служебных поездок',
    'Выдворение',
    'Проездных документов ',
    'Бронирование билетов',
    'Оформление авиабилетов',
    'Служебных командирований',
    'Командированию сотрудников',
    'Служебных командировок',
    'Проживание экипажей',
    'Обеспечение авиабилетами',
    'Обеспечение авиационными билетами',
    'Организации воздушных перевозок',
    'Перевозкам воздушным транспортом',
    'Пассажирские авиаперевозки иностранных граждан',
    'Оказание услуг связанных с бронированием',
    'Оказание услуг по организации командирования',
    'Билетного аутсорсинга'
  ],
  ZakupkiMos: [
    'Авиабилетов',
    'Командировок',
    'Деловых поездок',
    'Служебных поездок',
    'Командирований',
    'Авиаперевозки'
  ],
  LOTonline: [
    'Командировок',
    'Деловых поездок',
    'Служебных поездок',
    'Проездных документов ',
    'Бронирование авиабилетов',
    'Оформление авиабилетов',
    'Билетного аутсорсинга'
  ],
  EtpGPB: [
    'Авиационным транспортом',
    'Авиабилетов',
    'Деловых поездок',
    'Служебных поездок',
    'Бронирование билетов',
    'Авиационных билетов',
    'Железнодорожных билетов',
    'Командировок',
    'Командирований',
    'Обеспечение авиационными билетами',
    'Авиаперевозки',
    'Билетного аутсорсинга',
    'Оформлению авиа',
    'Бронированию гостиниц'
  ],
  B2BCenter: [
    'Организация командировок',
    'Организация деловых поездок',
    'Служебных поездок',
    'Проездных документов ',
    'Бронирование билетов',
    'Оформление авиабилетов',
    'Служебных командирований',
    'Командированию сотрудников',
    'Служебных командировок',
    'Проживание экипажей',
    'Обеспечение авиабилетами',
    'Обеспечение авиационными билетами',
    'Пассажирские авиаперевозки иностранных граждан',
    'Оказание услуг связанных с бронированием',
    'Оказание услуг по организации командирования'
  ]
};

export default QUERIES;
