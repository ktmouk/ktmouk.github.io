/// <reference types="@astrojs/image/client" />
interface ImportMetaEnv {
  readonly FETCH_POSTS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
