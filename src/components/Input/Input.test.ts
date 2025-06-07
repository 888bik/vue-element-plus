import { mount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import Input from "./Input.vue";

describe("Input.vue", () => {
  test("should show input", () => {
    //针对动态class,查看元素上的classes是否正确存在
    //针对v-if,查看是否渲染正确
    //针对插槽,查看是否渲染对应的插槽内容
    const wrapper = mount(Input, {
      props: {
        size: "small",
        type: "text",
        modelValue: "",
      },
      slots: {
        prepend: "https://",
        append: ".com",
      },
    });
    console.log(wrapper.html);
    // input
    //classes
    expect(wrapper.classes()).toContain("bk-input--small");
    expect(wrapper.classes()).toContain("bk-input--text");
    //render input
    expect(wrapper.find("input").exists()).toBeTruthy();
    expect(wrapper.get("input").attributes("type")).toBe("text");
    //slots
    expect(wrapper.classes()).toContain("is-prepend");
    expect(wrapper.classes()).toContain("is-append");
    // textarea
    const wrapper2 = mount(Input, {
      props: {
        type: "textarea",
        size: "large",
        modelValue: "",
      },
      slots: {
        prefix: "prefix",
        suffix: "suffix",
      },
    });
    console.log(wrapper2.html());
    //classes
    expect(wrapper2.classes()).toContain("bk-input--textarea");
    expect(wrapper2.classes()).toContain("bk-input--large");
    //render textarea
    expect(wrapper2.find("textarea").exists()).toBeTruthy();
  });
  test("should support modelValue", async () => {
    const wrapper = mount(Input, {
      props: {
        type: "text",
        modelValue: "test",
        "onUpdate:modelValue": (e: any) => {
          wrapper.setProps({ modelValue: e });
          console.log("onUpdate triggered, new value:", e); // 调试日志
        },
      },
    });
    //初始值
    const input = wrapper.get("input");
    expect(input.element.value).toBe("test");
    // 更新值
    // 注意 setValue 是组合事件,会触发 input 以及 change
    await input.setValue("update");
    expect(wrapper.props("modelValue")).toBe("update");
    expect(input.element.value).toBe("update");

    console.log("the events", wrapper.emitted());
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()).toHaveProperty("change");
    expect(wrapper.emitted()).toHaveProperty("input");

    //v-model的异步更新
    await wrapper.setProps({ modelValue: "prop update" });
    expect(input.element.value).toBe("prop update");
  });
  test("should support clear sting by clicking ", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "test",
        type: "text",
        disabled: false,
        clearable: true,
      },
      global: {
        stubs: ["Icon"],
      },
    });
    expect(wrapper.find(".bk-input__clear").exists()).toBeFalsy();
    const input = wrapper.get("input");
    //触发聚焦

    await input.trigger("focus");
    //icon出现
    expect(wrapper.find(".bk-input__clear").exists()).toBeTruthy();
    //点击icon,值变为空
    await wrapper.find(".bk-input__clear").trigger("click");
    expect(input.element.value).toBe("");
    // 点击值变为空并且消失，特别注意这里不仅仅会触发 clear 事件，对应的 input 以及 change 应该都会被触发，因为对应的值发生了变化
    expect(wrapper.emitted()).toHaveProperty("clear");
    expect(wrapper.emitted()).toHaveProperty("change");
    expect(wrapper.emitted()).toHaveProperty("input");
    const inputEvent = wrapper.emitted("input");
    const changeEvent = wrapper.emitted("change");
    expect(inputEvent![0]).toEqual([""]);
    expect(changeEvent![0]).toEqual([""]);

    await input.trigger("blur");
    expect(wrapper.emitted("blur")).toBeTruthy();
  });
  test.only("should support show or hidden password", async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: "",
        type: "text",
        showPassword: true,
        disabled: false,
      },
      global: {
        stubs: ["Icon"],
      },
    });
    //当没有值时不显示icon
    expect(wrapper.find(".bk-input__password").exists()).toBeFalsy();
    const input = wrapper.get("input");
    expect(input.element.type).toBe("password");
    //出现icon区域
    await input.setValue("1234");
    const eyeIcon = wrapper.find(".bk-input__password");
    expect(eyeIcon.exists()).toBeTruthy();
    //点击icon,password类型变为text类型
    await eyeIcon.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
    expect(wrapper.find(".bk-input__password").attributes("icon")).toBe("eye");
    expect(input.element.type).toBe("text");
  });
});
