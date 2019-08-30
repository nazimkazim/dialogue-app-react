export default {
    description:'The dialogue aims at practicing invitation and talking about daily activities',
    languagePair:'eng-rus',
    level:'Pre-intermediate',
    id: 'dialogue2',
    parts: [
      {
        text: `Привет Дэйл как у тебя дела?`,
        translation:'Hi Dale how are you?',
        audio: 'audio/аудио1.mp3',
        prompt: '',
        speaker: 1,
        id: 1
      },
      {
        text: 'Привет Терри, у меня не очень хорошо.',
        audio: 'audio/аудио2.mp3',
        prompt: 'Say: Hi Terry, I am not very well',
        speaker: 2,
        id: 2,
        helpers: [
          {
            word_mother: "Literally: I have not very well",
            word_target: 'У меня не очень хорошо'
          }
        ]
      },
      {
        text: 'Что случилось?',
        translation:'What happen?',
        audio: 'audio/аудио3.mp3',
        prompt: '',
        speaker: 1,
        id: 3,
        helpers: [
          {
            word_mother: 'To happen',
            word_target: 'случаться'
          },
          {
            word_mother: 'What',
            word_target: 'Что'
          },
          {
            word_mother: 'Случилось',
            word_target: 'past form of "случаться"'
          }

        ]
      },
      {
        text: 'У меня болит нога, я играл теннис вчера.',
        audio: 'audio/аудио4.mp3',
        speaker: 2,
        prompt: 'Say: My leg hurts, I played tennis yesterday',
        id: 4,
        helpers: [
          {
            word_mother: 'Hurt',
            word_target: 'болит'
          }
        ]
      },
      {
        text: 'Как ты её повредил?',
        translation:'How did you hurt it?',
        audio: 'audio/аудио5.mp3',
        speaker: 1,
        prompt: '',
        id: 5,
        helpers: [
          {
            word_mother: 'It',
            word_target: 'её (referring to the leg (femenine))'
          },
          {
            word_mother: 'To hurt',
            word_target: 'Повреждать'
          },
          {
            word_mother: 'Повредил (ты, referring to male)',
            word_target: 'past form of "повреждать"'
          }
        ]
      },
      {
        text:
          'Ты знаешь в субботу у меня работа, к сожалению, я не смогу прийти',
        audio: 'audio/аудио6.mp3',
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
        audio: 'audio/аудио7.mp3',
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
        audio: 'audio/аудио8.mp3',
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