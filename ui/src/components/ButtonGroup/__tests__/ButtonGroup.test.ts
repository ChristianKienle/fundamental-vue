import { assert } from "chai";
import { mount, Wrapper, createLocalVue } from "@vue/test-utils";
import FdButtonGroup from "./../ButtonGroup.vue";
import FdButton from "../../Button/Button.vue";
import FundamentalVue from "@/index";

describe("ButtonGroup", () => {
  let localVue = createLocalVue();
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(FundamentalVue);
  });

  it("supports v-model", async () => {
    const Wrapper = localVue.extend({
      data: () => ({ value: [] as any[] }),
      template: `
    <fd-button-group v-model="value">
      <fd-button value="b0">b0</fd-button>
      <fd-button value="b1">b1</fd-button>
      <fd-button value="b2">b2</fd-button>
    </fd-button-group>
    `
    });
    const wrapper = mount(Wrapper, { localVue });
    await localVue.nextTick();
    const group = wrapper.find(FdButtonGroup);
    const buttons = wrapper.findAll(FdButton);
    for (const buttonWrapper of buttons.wrappers) {
      const button = buttonWrapper.find("button");
      button.trigger("click");
      await localVue.nextTick();
      // @ts-ignore
      const buttonValue: any = buttonWrapper.vm.value;
      const value = wrapper.vm.value;
      const index = value.indexOf(buttonValue);
      assert.isTrue(index > -1);
    }
  });

  it("renders grouped buttons", () => {
    const buttonGroup = mount(
      {
        template: `
      <fd-button-group>
        <fd-button>b1</fd-button>
        <fd-button>b2</fd-button>
        <fd-button>b3</fd-button>
      </fd-button-group>
      `
      },
      { localVue }
    );
    const buttons = buttonGroup.findAll(FdButton);
    assert.lengthOf(buttons, 3);
    assert(
      buttons.wrappers.every(w => w.classes("fd-button--grouped")),
      "Every button is grouped"
    );
  });

  it("renders compact buttons if group is compact", () => {
    const buttonGroup = mount(
      {
        template: `
      <fd-button-group compact>
        <fd-button>b1</fd-button>
        <fd-button>b2</fd-button>
        <fd-button>b3</fd-button>
      </fd-button-group>
      `
      },
      { localVue }
    );
    const buttons = buttonGroup.findAll(FdButton);
    assert.lengthOf(buttons, 3);
    // We have no public api in order to determine whether a button is compact or not.
    // Because of that we have to check if the compact class is present.
    const buttonIsCompact = (button: Wrapper<any>) =>
      button.classes("fd-button--compact");
    assert(buttons.wrappers.every(buttonIsCompact, "Every button is compact"));
  });
});
