<template>
  <div class="tooltip-base-box">
    <div class="row center">
      <Tooltip
        class="box-item"
        effect="dark"
        content="Top Left prompts info"
        placement="top-start"
      >
        <Button>top-start</Button>
      </Tooltip>
      <Tooltip
        class="box-item"
        effect="dark"
        content="Top Center prompts info"
        placement="top"
      >
        <Button>top</Button>
      </Tooltip>
      <Tooltip
        class="box-item"
        effect="dark"
        content="Top Right prompts info"
        placement="top-end"
      >
        <Button>top-end</Button>
      </Tooltip>
    </div>
    <div class="row">
      <Tooltip
        class="box-item"
        effect="dark"
        content="Left Top prompts info"
        placement="left-start"
      >
        <Button>left-start</Button>
      </Tooltip>
      <Tooltip
        class="box-item"
        effect="dark"
        content="Right Top prompts info"
        placement="right-start"
      >
        <Button>right-start</Button>
      </Tooltip>
    </div>
    <div class="row">
      <Tooltip
        class="box-item"
        effect="dark"
        content="Left Center prompts info"
        placement="left"
      >
        <Button class="mt-3 mb-3">left</Button>
      </Tooltip>
      <Tooltip
        class="box-item"
        effect="dark"
        content="Right Center prompts info"
        placement="right"
      >
        <Button>right</Button>
      </Tooltip>
    </div>
    <div class="row">
      <Tooltip
        class="box-item"
        effect="dark"
        content="Left Bottom prompts info"
        placement="left-end"
      >
        <Button>left-end</Button>
      </Tooltip>
      <Tooltip
        class="box-item"
        effect="dark"
        content="Right Bottom prompts info"
        placement="right-end"
      >
        <Button>right-end</Button>
      </Tooltip>
    </div>
    <div class="row center">
      <Tooltip
        class="box-item"
        effect="dark"
        content="Bottom Left prompts info"
        placement="bottom-start"
      >
        <Button>bottom-start</Button>
      </Tooltip>
      <Tooltip
        class="box-item"
        effect="dark"
        content="Bottom Center prompts info"
        placement="bottom"
      >
        <Button>bottom</Button>
      </Tooltip>
      <Tooltip
        class="box-item"
        effect="dark"
        content="Bottom Right prompts info"
        placement="bottom-end"
      >
        <Button>bottom-end</Button>
      </Tooltip>
    </div>
  </div>
</template>
<script setup>
import Tooltip from "@/components/Tooltip/Tooltip.vue";
import Button from "@/components/Button/Button.vue";
</script>
<style>
.tooltip-base-box {
  width: 600px;
}
.tooltip-base-box .row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.tooltip-base-box .center {
  justify-content: center;
}
.tooltip-base-box .box-item {
  width: 110px;
  margin-top: 10px;
}
</style>
