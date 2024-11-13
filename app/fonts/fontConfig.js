import localFont from 'next/font/local'

export const Hatton = localFont({
  src: [
    {
      path: './Hatton/PPHatton-Ultralight.otf',
      weight: '200',
      style: 'normal',
      variable: 'font-creative-serif-light'
    },
    {
      path: './Hatton/PPHatton-Medium.otf',
      weight: '500',
      style: 'normal',
      variable: 'font-creative-serif-bold'
    },
    {
      path: './Hatton/PPHatton-Bold.otf',
      weight: '800',
      style: 'normal',
      variable: 'font-creative-serif-bold'
    },
    // {
    //   path: './Hatton/HattonItalic-ExtralightItalic.otf',
    //   weight: '200',
    //   style: 'italic',
    //   variable: 'font-creative-serif-light-italic'
    // },
    // {
    //   path: './Hatton/HattonItalic-ExtraboldItalic.otf',
    //   weight: '800',
    //   style: 'italic',
    //   variable: 'font-creative-serif-bold-italic'
    // },
  ],
})


export const Neue = localFont({
  src: [
    {
      path: './Neue/PPNeueCorp-NormalUltralight.otf',
      weight: '200',
      style: 'normal',
      variable: 'font-creative-serif-light'
    },
    {
      path: './Neue/PPNeueCorp-NormalMedium.otf',
      weight: '500',
      style: 'normal',
      variable: 'font-creative-serif-normal'
    },
    {
      path: './Neue/PPNeueCorp-NormalUltrabold.otf',
      weight: '800',
      style: 'normal',
      variable: 'font-creative-serif-bold'
    },
  ],
})
