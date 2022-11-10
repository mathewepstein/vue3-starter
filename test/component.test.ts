import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HomeBanner from '../src/components/HomeBanner.vue'

describe('HomeBanner.vue', () => {
  it('should render', () => {
    const wrapper = mount(HomeBanner)
    expect(wrapper.text()).toContain('soon')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
