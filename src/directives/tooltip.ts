const getOrCreateTooltip = (elId: string) => {
  const tooltipId = `${elId}__tooltip`

  let tooltipEl: HTMLElement | null = document.getElementById(tooltipId)
  let tooltipRoot: HTMLElement | null = document.getElementById(
    `${tooltipId}-container`
  )
  let tooltipPointEl: HTMLElement | null = document.getElementById(
    `${tooltipId}-point`
  )
  let tooltipBackdropEl: HTMLElement | null = document.getElementById(
    `${tooltipId}-backdrop`
  )

  // Create element on first render
  if (!tooltipEl) {
    tooltipEl = document.createElement('div')
    tooltipEl.id = tooltipId
    tooltipEl.classList.add('tooltip')
    document.getElementById(elId)?.after(tooltipEl)

    tooltipRoot = document.createElement('div')
    tooltipRoot.id = `${tooltipId}-container`
    tooltipRoot.classList.add('tooltip-container')
    tooltipEl.appendChild(tooltipRoot)

    tooltipPointEl = document.createElement('div')
    tooltipPointEl.id = `${tooltipId}-point`
    tooltipPointEl.classList.add('tooltip-point')
    tooltipEl.appendChild(tooltipPointEl)

    tooltipBackdropEl = document.createElement('div')
    tooltipBackdropEl.id = `${tooltipId}-backdrop`
    tooltipBackdropEl.classList.add('tooltip-backdrop')
    tooltipEl.after(tooltipBackdropEl)
  }

  return { tooltipEl, tooltipPointEl, tooltipBackdropEl, tooltipRoot }
}

const positionTooltip = (elId: string) => {
  const triggerEl = document.getElementById(elId)
  const tooltipEl = document.getElementById(`${elId}__tooltip`)
  const tooltipPointEl = document.getElementById(`${elId}__tooltip-point`)
  if (!triggerEl || !tooltipEl) return

  setTimeout(() => {
    let triggerElRect = triggerEl.getBoundingClientRect()

    // Initial positioning of tooltip at trigger el
    tooltipEl.style.top = `${triggerElRect.top + triggerElRect.height}px`
    tooltipEl.style.left = `${
      triggerElRect.left +
      triggerElRect.width / 2 -
      tooltipEl.getBoundingClientRect().width / 2
    }px`

    // Adjust if positioning overflows canvas
    const tooltipElRect = tooltipEl.getBoundingClientRect()
    const { left: positionLeft, right: positionRight } = tooltipElRect
    const { offsetWidth: canvasWidth } = document.body
    const offset = parseInt(getComputedStyle(document.documentElement).fontSize)
    // documentElement
    const canvasRightBounds = canvasWidth - offset
    const canvasLeftBounds = 0

    const overflowTipRight: boolean = positionRight > canvasRightBounds
    const overflowTipLeft: boolean = positionLeft < canvasLeftBounds

    let tipOffset =
      triggerElRect.left + triggerElRect.width / 2 - tooltipElRect.left - 8

    if (overflowTipLeft) {
      tooltipEl.style.left = `${canvasLeftBounds + triggerElRect.width}px`
      tipOffset =
        triggerElRect.left + triggerElRect.width / 2 - triggerElRect.width - 8
    }
    if (overflowTipRight) {
      tooltipEl.style.left = `${
        canvasWidth - tooltipElRect.width - triggerElRect.width
      }px`
      tipOffset =
        triggerElRect.left -
        (canvasWidth - tooltipElRect.width - triggerElRect.width)
    }

    tooltipPointEl!.style.left = `${tipOffset}px`
  }, 1)
}

export default {
  updateTooltip(el: HTMLElement, { value, modifiers }) {
    const { tooltipEl, tooltipRoot } = getOrCreateTooltip(el.id)

    const span = document.createElement('div')
    span.innerHTML = value

    tooltipRoot!.innerHTML = ''

    tooltipRoot!.appendChild(span)

    el.after(tooltipEl)

    positionTooltip(el.id)
  },
  // hooks
  mounted(el: HTMLElement, { value, dir, modifiers }) {
    // v-tooltips with global prop won't show the tooltip
    // also object notation without text prop won't show neither
    if (typeof value === 'object' && !value.global && value.text) {
      el.classList.add('data-v-tooltip')
    } else if (typeof value === 'string') {
      el.classList.add('data-v-tooltip')
    }

    // to use functions in Vue's directives which are inside this object, we can't use this, we have to use dir, which is the directive object
    dir.updateTooltip(el, { value, modifiers })

    window.addEventListener('resize', function () {
      dir.updateTooltip(el, { value, modifiers })
    })
  },
  updated(el: HTMLElement, { value, dir, modifiers }) {
    dir.updateTooltip(el, { value, modifiers })
  },
}
