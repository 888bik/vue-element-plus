import { isRef, onBeforeUnmount, onMounted, unref, watch, type Ref } from "vue";

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handle: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (newValue, oldValue) => {
      oldValue?.removeEventListener(event, handle);
      newValue?.addEventListener(event, handle);
    });
  } else {
    onMounted(() => {
      target.addEventListener(event, handle);
    });
  }
  onBeforeUnmount(() => {
    unref(target)?.removeEventListener(event, handle);
  });
}
