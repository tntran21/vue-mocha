/**
 * write unit test for component HelloWorld.vue
 */
import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import { expect } from "chai";

describe("HelloWorld.vue", () => {
  // test case 1
  it("renders props.msg when passed", () => {
    const msg = "new message";
    // shallowMount: create a wrapper for a component
    const wrapper = mount(HelloWorld, {
      props: { msg },
    });
    // expect: assert result
    expect(wrapper.text()).equal(msg);
  });
});
