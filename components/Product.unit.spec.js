import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard'
import { makeServer } from '@/miragejs/server'

describe('ProductCard - unit', () => {
  let server

  const mountProductCard = () => {
    const product = server.create('product', {
      title: 'Relógio bonito',
      price: '$22.00',
      image:
        'https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    })

    const wrapper = mount(ProductCard, {
      propsData: {
        product,
      },
    })

    return {
      wrapper,
      product,
    }
  }

  beforeEach(() => {
    server = makeServer({ environment: 'test' })
  })

  afterEach(() => {
    server.shutdown()
  })

  it('should match snapshot', () => {
    const { wrapper } = mountProductCard()

    expect(wrapper.element).toMatchSnapshot()
  })

  it('should mounted the component', () => {
    const { wrapper } = mountProductCard()

    expect(wrapper.vm).toBeDefined()
    expect(wrapper.text()).toContain('$22.00')
    expect(wrapper.text()).toContain('Relógio bonito')
  })

  it('should emit the event addToCart with product object', async () => {
    const { wrapper, product } = mountProductCard()

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted().addToCart).toBeTruthy()
    expect(wrapper.emitted().addToCart.length).toBe(1)
    expect(wrapper.emitted().addToCart[0]).toEqual([{ product }])
  })
})
