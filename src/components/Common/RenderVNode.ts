import { defineComponent } from "vue";

const RenderVNode = defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true,
    },
  },
  setup(props) {
    //直接绕过模板编译,直接将vnode传递给渲染器
    return () => props.vNode;
  },
});
export default RenderVNode;
