const path = require('path');

export default {
    description:'The dialogue aims at improving basic conversational skills, such as greeting and daily interactions',
    languagePair:'eng-rus',
    level:'Beginner',
    id: 'dialogue1',
    parts: [
      {
        text: `как дела?`,
        audio: path.resolve('/dialogue1_audio/audio1.mp3'),
        prompt: '',
        speaker: 1,
        id: 1
      },
      {
        text: 'у меня все хорошо, а как ты?',
        audio: path.resolve('/dialogue1_audio/audio2.mp3'),
        prompt: 'Say that: I am OK, how about you?',
        speaker: 2,
        id: 2,
        helpers: [
          {
            word_mother: "I'm all right",
            word_target: 'У меня все хорошо'
          },
          {
            word_mother: 'And you?',
            word_target: 'А как ты?'
          }
        ]
      },
      {
        text: 'у меня тоже неплохо, кстати а что ты делаешь в субботу',
        audio: path.resolve('/dialogue1_audio/audio3.mp3'),
        prompt: '',
        speaker: 1,
        id: 3,
        helpers: [
          {
            word_mother: 'Not bad',
            word_target: 'неплохо'
          },
          {
            word_mother: 'By the way',
            word_target: 'Кстати'
          }
        ]
      },
      {
        text: 'в субботу у меня футбол, а что?',
        audio: path.resolve('/dialogue1_audio/audio4.mp3'),
        speaker: 2,
        prompt: 'Say that: I have football on Saturday, why are you asking?',
        id: 4,
        helpers: [
          {
            word_mother: 'Why are you asking?',
            word_target: 'А что?'
          }
        ]
      },
      {
        text: 'Просто я хотел пригласить тебя на день рождения',
        audio: path.resolve('/dialogue1_audio/audio5.mp3'),
        speaker: 1,
        prompt: '',
        id: 5,
        helpers: [
          {
            word_mother: 'Just',
            word_target: 'Просто'
          },
          {
            word_mother: 'Wanted',
            word_target: 'Хотел (past simple form)'
          },
          {
            word_mother: 'To invite',
            word_target: 'Пригласить'
          },
          {
            word_mother: 'Birthday',
            word_target: 'День рождения'
          }
        ]
      },
      {
        text:
          'Ты знаешь в субботу у меня работа, к сожалению, я не смогу прийти',
        audio: path.resolve('/dialogue1_audio/audio6.mp3'),
        speaker: 2,
        id: 6,
        prompt:
          'Say that: You know what, on Saturday I have football, unfortunately, I cannot come',
        helpers: [
          {
            word_mother: 'You know what!',
            word_target: 'Ты знаешь!'
          },
          {
            word_mother: 'Unfortunately!',
            word_target: 'К сожалению!'
          },
          {
            word_mother: 'Cannot',
            word_target: 'Не могу'
          }
        ]
      },
      {
        text: 'Тогда как насчет воскресенья',
        audio: path.resolve('/dialogue1_audio/audio7.mp3'),
        speaker: 1,
        prompt: '',
        id: 7,
        helpers: [
          {
            word_mother: 'Then',
            word_target: 'Тогда'
          },
          {
            word_mother: 'How about',
            word_target: 'Как насчет'
          }
        ]
      },
      {
        text:
          'Да, давай увидимся в Воскресенье, как раз, у буду свободен весь день',
        audio: path.resolve('/dialogue1_audio/audio8.mp3'),
        speaker: 2,
        id: 8,
        prompt:
          "Tell your partner: Yes, let's meet on Sunday, it just so happens that, I will be free on Sunday the entire day",
        helpers: [
          {
            word_mother: "Let's meet",
            word_target: 'Давай увидимся'
          },
          {
            word_mother: 'It just so happens that',
            word_target: 'Как раз'
          },
          {
            word_mother: 'I will be free',
            word_target: 'Я буду свободным'
          },
          {
            word_mother: 'The entire day',
            word_target: 'Весь день'
          }
        ]
      }
    ]
  }