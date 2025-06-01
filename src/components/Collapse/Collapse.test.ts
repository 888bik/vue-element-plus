import { mount, VueWrapper } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
import CollapseItem from "./CollapseItem.vue";
import { h } from "vue";
import Collapse from "./Collapse.vue";

describe("Collapse.vue", () => {
  test("basic collapse", async () => {
    const wrapper: VueWrapper = mount(Collapse, {
      props: {
        modelValue: ["a"],
      },
      slots: {
        default: () => [
          h(CollapseItem, { name: "a", title: "title a" }, () => "content a"),
          h(CollapseItem, { name: "b", title: "title b" }, () => "content b"),
          h(
            CollapseItem,
            { name: "c", title: "title c", disabled: true },
            () => "content c"
          ),
        ],
      },
      global: {
        stubs: ["Icon"],
      },
      attachTo: document.body,
    });
    // console.log(wrapper.html());
    // console.log(wrapper.classes());
    const headers = wrapper.findAll(".bk-collapse-item__header");
    const contents = wrapper.findAll(".bk-collapse-item__wrapper");
    //数量
    expect(headers.length).toBe(3);
    expect(contents.length).toBe(3);
    //文本
    const firstHeader = headers[0];
    const secondHeader = headers[1];
    expect(firstHeader.text()).toBe("title a");
    expect(secondHeader.text()).toBe("title b");

    //内容
    const firstContent = contents[0];
    const thirdContent = contents[2];
    expect(firstContent.text()).toBe("content a");
    expect(firstContent.isVisible()).toBeTruthy();
    expect(thirdContent.isVisible()).toBeFalsy();

    //行为
    await firstHeader.trigger("click");
    expect(firstContent.isVisible()).toBeFalsy();
    await secondHeader.trigger("click");
    expect(secondHeader.isVisible()).toBeTruthy();

    expect(wrapper.emitted()).toHaveProperty("change");

    const changeEvent = wrapper.emitted("change") as any[];
    console.table(changeEvent);

    expect(changeEvent).toHaveLength(2);
    expect(changeEvent[0]).toEqual([[]]);
    expect(changeEvent[1]).toEqual([["b"]]);

    //disabled
    const disabledItem = wrapper.findAll(".bk-collapse-item")[2];
    expect(disabledItem.classes()).toContain("is-disabled");

    await disabledItem.trigger("click");

    const disabledItemContent = disabledItem.find(".bk-collapse-item__content");
    expect(disabledItemContent.isVisible()).toBeFalsy();
  });
});
