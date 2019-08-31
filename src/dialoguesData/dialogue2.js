export default {
    name:'Terry invites Dale to the cinema',
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
            word_target: 'past form of "повредить"'
          }
        ]
      },
      {
        text:
          'Я растянул ногу когда хотел отбить мяч',
        audio: 'audio/аудио6.mp3',
        speaker: 2,
        id: 6,
        prompt:
          'Say: I sprained my leg when I wanted to return a ball',
        helpers: [
          {
            word_mother: 'Sprain (sprained)',
            word_target: 'Растянуть (растянул)'
          },
          {
            word_mother: 'Return a ball',
            word_target: 'Отбить мяч'
          },
          {
            word_mother: 'To beat',
            word_target: 'Бить'
          }
        ]
      },
      {
        text: 'Я хочу пригласить тебя в горы',
        translation:'I want to invite you to the mountains',
        audio: 'audio/аудио7.mp3',
        speaker: 1,
        prompt: '',
        id: 7,
        helpers: [
          {
            word_mother: 'To invite',
            word_target: 'Пригласить'
          },
          {
            word_mother: 'Mountains',
            word_target: 'Горы'
          }
        ]
      },
      {
        text:
          'Уау, кто пойдет в горы с нами?',
        audio: 'audio/аудио8.mp3',
        speaker: 2,
        id: 8,
        prompt:
          "Say: Wow, how cool, who is going to go to the mountains with us?",
        helpers: [
          {
            word_mother: "Will go",
            word_target: 'Пойдет'
          },
          {
            word_mother: 'With us',
            word_target: 'С нами'
          },
          {
            word_mother: 'How cool!',
            word_target: 'Как круто!'
          }
        ]
      },
      {
        text:
          'Моя мама, папа, сестра, племянник, племянница и может быть бабушка',
        audio: 'audio/аудио8.mp3',
        translation:'My mother, father, nephew, niece and maybe grandmother',
        speaker: 1,
        id: 8,
        helpers: [
          {
            word_mother: "Nephew",
            word_target: 'Племянник'
          },
          {
            word_mother: 'Niece',
            word_target: 'Племянница'
          }
        ]
      },
      {
        text:
          'Как мы поедем в горы?',
        audio: 'audio/аудио8.mp3',
        prompt:'Say: How will we go to the mountains',
        speaker: 2,
        id: 9,
        helpers: [
          {
            word_mother: "Will go",
            word_target: 'Поедем'
          },
          {
            word_mother: 'To the mountains',
            word_target: 'В горы'
          }
        ]
      },
      {
        text:
          'Я думаю на машине, потому что на автобусе будет долго',
        audio: 'audio/аудио8.mp3',
        translation:'I think by car, because by bus will be very long',
        speaker: 1,
        id: 9,
        helpers: [
          {
            word_mother: "By car",
            word_target: 'На машине'
          },
          {
            word_mother: 'By bus',
            word_target: 'На автобусе'
          },
          {
            word_mother: 'Very long',
            word_target: 'Очень долго'
          }
        ]
      },
      {
        text:
          'Хорошо, если не секрет, можешь сказать чем мы будем там заниматься',
        audio: 'audio/аудио8.mp3',
        prompt:'Say: Good, if it is not a secret, could you tell we what (чем) we will do (заниматься) there?',
        speaker: 2,
        id: 9,
        helpers: [
          {
            word_mother: "If",
            word_target: 'если'
          },
          {
            word_mother: 'Not a secret',
            word_target: 'Не секрет'
          }
        ]
      },
      {
        text:
          'Конечно не секрет, мы будем, играть в футбол, играть на гитаре, петь песни, кататься на велосипеде.А ты умеешь играть на гитаре?',
        audio: 'audio/аудио8.mp3',
        translation:'Of course it is not a secret, we will play football, play the guitar, sing songs, ride bikes. Can you play the guitar?',
        speaker: 1,
        id: 9,
        helpers: [
          {
            word_mother: "Can you play the guitar?",
            word_target: 'Ты умеешь играть на гитаре?'
          }
        ]
      },
      {
        text:
          'Да я умею играть на гитаре, я учился в музыкальной школе',
        audio: 'audio/аудио8.mp3',
        prompt:'Say: Yes, I can play the guitar, I studied at musical school',
        speaker: 2,
        id: 9,
        helpers: [
          {
            word_mother: "Music School",
            word_target: 'музыкальная школа'
          }
        ]
      },
      {
        text:
          'Отлично, я очень рада, мы встречаемся в Воскресенье в 8 часов утра. Пока',
        audio: 'audio/аудио8.mp3',
        translation:'We meet at 8 in the morning, bye',
        speaker: 1,
        id: 9,
        helpers: [
          {
            word_mother: "We meet",
            word_target: 'Мы встречаемся'
          }
        ]
      },
      {
        text:
          'Пока, увидимся в Воскресенье',
        audio: 'audio/аудио8.mp3',
        prompt:'Say:Bye, see you on Sunday',
        speaker: 2,
        id: 9,
        helpers: [
          {
            word_mother: "See you",
            word_target: 'увидимся'
          }
        ]
      }
    ]
  }