import { mount } from "@vue/test-utils";
import FdMenuLink from "./../MenuLink.vue";

describe("MenuLink", () => {
  it("renders correctly", () => {
    expect(
      mount({
        template: `<FdMenuLink>Item 1</FdMenuLink>`,
        components: { FdMenuLink }
      }).element
    ).toMatchSnapshot();
  });

  it("can be disabled", () => {
    const wrapper = mount({
      template: `<fd-menu-link :disabled="disabled">title</fd-menu-link>`,
      components: { FdMenuLink },
      data() {
        return {
          disabled: false
        };
      }
    });

    const link = wrapper.find(FdMenuLink);
    expect(link.emitted("click")).toBeUndefined();
    wrapper.find("a").trigger("click");
    const clicks = link.emitted("click");
    expect(clicks.length).toBe(1);
    wrapper.vm.disabled = true;
    expect(wrapper.element).toMatchSnapshot();
    wrapper.find("a").trigger("click");
    expect(clicks.length).toBe(1);
  });
});