import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HomeHero from '../src/components/HomeHero.vue'

describe('HomeHero.vue', () => {
  it('should render', () => {
    const wrapper = mount(HomeHero)
    expect(wrapper.text()).toContain('Welcome')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
