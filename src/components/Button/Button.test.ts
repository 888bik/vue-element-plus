import { describe, test, expect } from "vitest";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mount, VueWrapper } from "@vue/test-utils";
import Button from "./Button.vue";

describe("Button.vue", () => {
  test("basic button", () => {
    const wrapper: VueWrapper = mount(Button, {
      props: {
        type: "primary",
      },
      slots: {
        default: "button",
      },
    });
    console.log(wrapper.html());
    // console.log(wrapper.classes()); //这里找的是组件根实例,所以打印[]
    const button = wrapper.find("button");
    expect(button.classes()).toContain("bk-button--primary");
    expect(button.text()).toBe("button");
    //events
    button.trigger("click");
    console.log(wrapper.emitted());
    expect(wrapper.emitted()).toHaveProperty("click");
  });
  test("disabled", () => {
    const wrapper: VueWrapper = mount(Button, {
      props: {
        type: "primary",
        disabled: true,
      },
      slots: {
        default: "disabled",
      },
    });
    const button = wrapper.get("button");
    console.log(button.attributes());
    expect(button.attributes("disabled")).toBeDefined();
    // console.log(button.element);
    expect(button.element.disabled).toBeDefined();
    button.trigger("click");
    expect(wrapper.emitted()).not.toHaveProperty("click");
  });
  test("icon", () => {
    const wrapper: VueWrapper = mount(Button, {
      props: {
        type: "primary",
        loading: true,
        icon: "spinner",
      },
      slots: {
        default: "icon",
      },
      global: {
        // components: {
        //   FontAwesomeIcon,
        // },
        stubs: ["FontAwesomeIcon"],
      },
    });
    const button = wrapper.find("button");

    const iconEl = button.findComponent(FontAwesomeIcon);

    expect(iconEl.exists()).toBeTruthy();
  });
});
