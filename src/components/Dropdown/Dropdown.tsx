import type { Options, Placement } from "@popperjs/core";
import { defineComponent, Fragment, ref, type PropType } from "vue";
import type { MenuOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import "./style.scss";
import type { TooltipInstance } from "../Tooltip/types";

export default defineComponent({
  name: "BkDropdown",
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: "bottom",
    },
    trigger: {
      type: String as PropType<"hover" | "click">,
      default: "hover",
    },
    transition: {
      type: String,
      default: "fade",
    },
    openDelay: {
      type: Number,
      default: 0,
    },
    closeDelay: {
      type: Number,
      default: 0,
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true,
    },
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
    manual: {
      type: Boolean,
    },
  },
  emits: ["visible-change", "select"],
  setup(props, { emit, slots, expose }) {
    const tooltipRef = ref<TooltipInstance | null>(null);
    const itemClick = (item: MenuOption) => {
      if (item.disabled) {
        return;
      }
      emit("select", item);
      if (props.hideAfterClick) {
        tooltipRef.value?.hide();
      }
    };
    const visibleChange = (isVisible: boolean) => {
      emit("visible-change", isVisible);
    };
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide(),
    });
    return () => (
      <div class="bk-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          manual={props.manual}
          ref={tooltipRef}
          onVisible-change={visibleChange}
        >
          {{
            default: () => slots.default && slots.default?.(),
            content: () => (
              <ul class="bk-dropdown__menu">
                {props.menuOptions.map((item) => {
                  return (
                    <Fragment>
                      {item.divided ? (
                        <li class="divided-placeholder" role="separator" />
                      ) : (
                        ""
                      )}
                      <li
                        class={{
                          "bk-dropdown__item": true,
                          "is-disabled": item.disabled,
                          "is-divided": item.divided,
                        }}
                        id={`dropdown-item-${item.key}`}
                        onClick={() => itemClick(item)}
                      >
                        {item.label}
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            ),
          }}
        </Tooltip>
      </div>
    );
  },
});
