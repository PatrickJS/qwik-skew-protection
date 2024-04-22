import { $, component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$, type DocumentHead } from "@builder.io/qwik-city";

export const getServerData = server$(function () {
  console.log("server data", this.cookie?.get("__vdpl")?.value);
  return {
    name: "Qwik",
  };
});

export default component$(() => {
  const data = useSignal<any>();
  useTask$(async () => {
    const res = await getServerData();
    console.log("task", res);
    data.value = res;
  });
  return (
    <>
      <h1>Hi 👋</h1>
      <p>
        Can't wait to see what you build with qwik!
        <br />
        Happy coding.
        <button
          onClick$={[
            $(async () => {
              const res = await getServerData();
              console.log("task", res);
              data.value = res;
            }),
          ]}
        >
          Click me
        </button>
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
