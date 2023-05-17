//判断是否支持webp
const loadImg = (src: string, t: string) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      window
        .createImageBitmap(image)
        .then(() => {
          window.localStorage.setItem('compatibilityImg', t);
          typeClass[t]();
          resolve(true);
        })
        .catch(() => {
          resolve(false);
        });
    };
    image.onerror = () => {
      resolve(false);
    };
    image.src = src;
  });
};

const typeLoadImg: any = {
  avif: async () => {
    return await loadImg(
      'data:image/avif;base64,AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAARNtZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAAImlsb2MAAAAAREAAAQABAAAAAAE3AAEAAAAAAAAAGAAAACNpaW5mAAAAAAABAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAk2lwcnAAAABzaXBjbwAAABNjb2xybmNseAACAAIABoAAAAAMYXYxQ4EgAAAAAAAUaXNwZQAAAAAAAAAMAAAACAAAAChjbGFwAAAADAAAAAEAAAAIAAAAAf////wAAAAC////+AAAAAIAAAAQcGl4aQAAAAADCAgIAAAAGGlwbWEAAAAAAAAAAQABBYGCA4SFAAAAIG1kYXQSAAoIOAyvsIEBA0gyChgAAABAAMNdmy4=',
      'avif',
    );
  },
  webp: async () => {
    return await loadImg(
      'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=',
      'webp',
    );
  },
  png: async () => {
    window.localStorage.setItem('compatibilityImg', 'png');
    return true;
  },
};
const typeClass: any = {
  avif: () => {
    document.body.classList.add('avif');
  },
  webp: () => {
    document.body.classList.add('webp');
  },
};

const compatibilityImg = async () => {
  const tWebp: any = window.localStorage.getItem('compatibilityImg');
  if (typeClass[tWebp]) {
    typeClass[tWebp]();
  } else {
    for (const i in typeLoadImg) {
      console.log(i);
      const state = await typeLoadImg[i]();
      if (state) {
        return;
      }
    }
  }
};

export default {
  compatibilityImg,
};
