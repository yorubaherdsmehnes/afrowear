declare module '*.webm' {
  const src: string;
  export default src;
}
declare module '*.svg?url' {
  const content: string;
  export default content;
}