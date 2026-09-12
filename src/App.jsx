import { useEffect, useState } from 'react'
import './App.css'

const LOCATIONS = [
  'Chennai Central',
  'Tambaram',
  'Chengalpattu',
  'Tindivanam',
  'Villupuram',
  'Tiruchirappalli',
  'Madurai',
]

const PLACES_BY_LOCATION = {
  'Chennai Central': [
    { name: 'Fort St. George', note: 'Historic fort & museum' },
    { name: 'Marina Beach Walk', note: 'Seafront promenade' },
    { name: 'Government Museum', note: 'Art & archaeology' },
  ],
  Tambaram: [
    { name: 'Kishkinta Theme Park', note: 'Family rides nearby' },
    { name: 'Nanmangalam Reserve', note: 'Short nature trail' },
    { name: 'Hindu Mission Temple', note: 'Quiet local visit' },
  ],
  Chengalpattu: [
    { name: 'Vedanthangal Bird Sanctuary', note: 'Seasonal birding' },
    { name: 'Kolavai Lake View', note: 'Sunset lakeside stop' },
    { name: 'Mahabalipuram Roadside Crafts', note: 'Stone carving stalls' },
  ],
  Tindivanam: [
    { name: 'Gingee Fort Outlook', note: 'Hill fort views' },
    { name: 'Mailam Murugan Temple', note: 'Pilgrim landmark' },
    { name: 'Local Millet Market', note: 'Fresh regional snacks' },
  ],
  Villupuram: [
    { name: 'Gingee Rajagiri Climb', note: 'Short trek stop' },
    { name: 'Thiruvakkarai Fossil Park', note: 'Rare rock forms' },
    { name: 'Village Pottery Lane', note: 'Handmade clayware' },
  ],
  Tiruchirappalli: [
    { name: 'Rockfort Temple', note: 'City hilltop shrine' },
    { name: 'Sri Ranganathaswamy Temple', note: 'Island temple complex' },
    { name: 'Kaveri River Ghat', note: 'Evening riverside walk' },
  ],
  Madurai: [
    { name: 'Meenakshi Amman Temple', note: 'Iconic city temple' },
    { name: 'Thirumalai Nayakkar Palace', note: 'Palace courtyards' },
    { name: 'Gandhi Memorial Museum', note: 'History exhibits' },
  ],
}

const DEFAULT_PLACES = [
  { name: 'Town Square Walk', note: 'Local street sights' },
  { name: 'Heritage Corner', note: 'Old-town landmarks' },
  { name: 'Viewpoint Deck', note: 'Quick photo stop' },
]

const SHOPS_BY_LOCATION = {
  'Chennai Central': [
    {
      id: 'cc-food',
      category: 'Food',
      name: 'Central Spice Kitchen',
      note: 'Quick meals near station',
      items: [
        { id: 'cc-f1', name: 'Vegetable Biryani', price: 120 },
        { id: 'cc-f2', name: 'Filter Coffee', price: 40 },
        { id: 'cc-f3', name: 'Masala Dosa Pack', price: 80 },
      ],
    },
    {
      id: 'cc-snacks',
      category: 'Snacks',
      name: 'Platform Crunch Cart',
      note: 'Ready-to-grab bites',
      items: [
        { id: 'cc-s1', name: 'Banana Chips', price: 50 },
        { id: 'cc-s2', name: 'Roasted Peanuts', price: 35 },
      ],
    },
    {
      id: 'cc-essentials',
      category: 'Essentials',
      name: 'Travel Needs Mart',
      note: 'Water, chargers, kits',
      items: [
        { id: 'cc-e1', name: 'Mineral Water 1L', price: 20 },
        { id: 'cc-e2', name: 'USB Cable', price: 150 },
      ],
    },
  ],
  Tambaram: [
    {
      id: 'tb-food',
      category: 'Food',
      name: 'Tambaram Tiffin House',
      note: 'South Indian tiffin',
      items: [
        { id: 'tb-f1', name: 'Idli Combo', price: 60 },
        { id: 'tb-f2', name: 'Pongal Bowl', price: 70 },
      ],
    },
    {
      id: 'tb-drinks',
      category: 'Drinks',
      name: 'Cool Junction Cafe',
      note: 'Fresh juices',
      items: [
        { id: 'tb-d1', name: 'Sugarcane Juice', price: 40 },
        { id: 'tb-d2', name: 'Lemon Soda', price: 30 },
      ],
    },
  ],
  Chengalpattu: [
    {
      id: 'cg-food',
      category: 'Food',
      name: 'Lakeview Meals',
      note: 'Homestyle lunch',
      items: [
        { id: 'cg-f1', name: 'Curd Rice Pack', price: 70 },
        { id: 'cg-f2', name: 'Lemon Rice', price: 65 },
      ],
    },
    {
      id: 'cg-crafts',
      category: 'Crafts',
      name: 'Stone Craft Stall',
      note: 'Local handmade gifts',
      items: [
        { id: 'cg-c1', name: 'Soapstone Figurine', price: 220 },
        { id: 'cg-c2', name: 'Keychain Set', price: 90 },
      ],
    },
  ],
  Tindivanam: [
    {
      id: 'tn-snacks',
      category: 'Snacks',
      name: 'Highway Millet Hub',
      note: 'Healthy travel snacks',
      items: [
        { id: 'tn-s1', name: 'Millet Cookies', price: 55 },
        { id: 'tn-s2', name: 'Ragi Chips', price: 45 },
      ],
    },
    {
      id: 'tn-food',
      category: 'Food',
      name: 'Fort Road Kitchen',
      note: 'Hot plated meals',
      items: [
        { id: 'tn-f1', name: 'Chicken Rice Box', price: 140 },
        { id: 'tn-f2', name: 'Veg Thali Mini', price: 110 },
      ],
    },
  ],
  Villupuram: [
    {
      id: 'vp-food',
      category: 'Food',
      name: 'Junction Family Meals',
      note: 'Packed meals ready',
      items: [
        { id: 'vp-f1', name: 'Sambar Rice', price: 75 },
        { id: 'vp-f2', name: 'Chapati Curry Set', price: 95 },
      ],
    },
    {
      id: 'vp-essentials',
      category: 'Essentials',
      name: 'Roadside Utility Store',
      note: 'Travel basics',
      items: [
        { id: 'vp-e1', name: 'Wet Wipes Pack', price: 40 },
        { id: 'vp-e2', name: 'Power Bank Rent', price: 80 },
      ],
    },
  ],
  Tiruchirappalli: [
    {
      id: 'tr-food',
      category: 'Food',
      name: 'Rockfort Hot Pot',
      note: 'City favorites',
      items: [
        { id: 'tr-f1', name: "Trichy's Biryani", price: 160 },
        { id: 'tr-f2', name: 'Parotta Kurma', price: 90 },
      ],
    },
    {
      id: 'tr-sweets',
      category: 'Sweets',
      name: 'Temple Street Sweets',
      note: 'Fresh local sweets',
      items: [
        { id: 'tr-sw1', name: 'Mysore Pak', price: 100 },
        { id: 'tr-sw2', name: 'Jangiri Box', price: 120 },
      ],
    },
  ],
  Madurai: [
    {
      id: 'md-food',
      category: 'Food',
      name: 'Meenakshi Side Kitchen',
      note: 'Famous Madurai bites',
      items: [
        { id: 'md-f1', name: 'Jigarthanda Cup', price: 60 },
        { id: 'md-f2', name: 'Kari Dosa', price: 90 },
        { id: 'md-f3', name: 'Mutton Chukka Pack', price: 180 },
      ],
    },
    {
      id: 'md-snacks',
      category: 'Snacks',
      name: 'Palace Road Snacks',
      note: 'Crispy travel packs',
      items: [
        { id: 'md-s1', name: 'Murukku Pack', price: 50 },
        { id: 'md-s2', name: 'Mixture Box', price: 70 },
      ],
    },
  ],
}

const DEFAULT_SHOPS = [
  {
    id: 'def-food',
    category: 'Food',
    name: 'Junction Meal Point',
    note: 'Simple hot meals',
    items: [
      { id: 'def-f1', name: 'Veg Meals', price: 90 },
      { id: 'def-f2', name: 'Tea & Bun', price: 35 },
    ],
  },
  {
    id: 'def-snacks',
    category: 'Snacks',
    name: 'Stop & Snack',
    note: 'Packaged bites',
    items: [
      { id: 'def-s1', name: 'Chips Pack', price: 30 },
      { id: 'def-s2', name: 'Energy Bar', price: 45 },
    ],
  },
]

const STOP_GAP = 108

function getPlacesForStop(stopName) {
  return PLACES_BY_LOCATION[stopName] ?? DEFAULT_PLACES
}

function getShopsForStop(stopName) {
  return SHOPS_BY_LOCATION[stopName] ?? DEFAULT_SHOPS
}

function getShopImages(shopId) {
  return [
    `https://picsum.photos/seed/${shopId}-a/160/110`,
    `https://picsum.photos/seed/${shopId}-b/160/110`,
  ]
}

function groupShopsByCategory(shops) {
  return shops.reduce((groups, shop) => {
    if (!groups[shop.category]) groups[shop.category] = []
    groups[shop.category].push(shop)
    return groups
  }, {})
}

function formatArrival(index) {
  if (index === 0) return 'Now'
  const totalMinutes = 9 * 60 + index * 45
  const hours = Math.floor(totalMinutes / 60) % 24
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

function createRng(seed) {
  let value = seed >>> 0
  return () => {
    value = (Math.imul(value, 1664525) + 1013904223) >>> 0
    return value / 4294967296
  }
}

function seedFromText(text) {
  let hash = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function buildPlaceRoute(junctionName, placeName, seed) {
  const rand = createRng(seed)
  const midStops = [
    `${junctionName} exit gate`,
    'Local walkway',
    `${placeName} approach`,
  ].slice(0, 1 + Math.floor(rand() * 2))

  const names = [junctionName, ...midStops, placeName]
  const gap = 72
  const offsets = names.map((_, index) => {
    const progress = names.length === 1 ? 0.5 : index / (names.length - 1)
    const wave = 0.5 + 0.28 * Math.sin(progress * Math.PI * (1.8 + rand()) + rand() * 3)
    const drift = (rand() - 0.5) * 0.3
    return Math.min(0.84, Math.max(0.16, wave + drift))
  })

  const average =
    offsets.reduce((sum, value) => sum + value, 0) / Math.max(offsets.length, 1)
  const shift = 0.5 - average
  for (let i = 0; i < offsets.length; i += 1) {
    offsets[i] = Math.min(0.82, Math.max(0.18, offsets[i] + shift))
  }

  const points = offsets.map((x, index) => ({
    x: x * 100,
    y: 20 + index * gap,
  }))

  let roadPath = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1]
    const next = points[i]
    const dy = next.y - prev.y
    const bulge = (rand() - 0.5) * 36
    const kink = (rand() - 0.5) * 20
    const c1x = prev.x + (next.x - prev.x) * (0.2 + rand() * 0.25) + bulge
    const c1y = prev.y + dy * (0.3 + rand() * 0.15)
    const c2x = prev.x + (next.x - prev.x) * (0.55 + rand() * 0.25) - bulge * 0.5 + kink
    const c2y = prev.y + dy * (0.6 + rand() * 0.2)
    roadPath += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)}`
  }

  const stops = names.map((name, index) => {
    const isStart = index === 0
    const isEnd = index === names.length - 1
    let role = 'junction'
    if (isStart) role = 'start'
    if (isEnd) role = 'destination'

    return {
      id: `place-route-${index}-${name}`,
      name,
      role,
      eta: isStart ? 'From junction' : isEnd ? 'Arrive here' : `+${index * 2} min walk`,
      x: offsets[index] * 100,
      y: points[index].y,
      side: offsets[index] < 0.5 ? 'right' : 'left',
    }
  })

  return {
    placeName,
    junctionName,
    stops,
    roadPath,
    canvasHeight: points[points.length - 1].y + 24,
  }
}

function buildDummyRoute(from, to, seed) {
  const fromIndex = LOCATIONS.indexOf(from)
  const toIndex = LOCATIONS.indexOf(to)

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return null
  }

  const ascending = fromIndex < toIndex
  const slice = ascending
    ? LOCATIONS.slice(fromIndex, toIndex + 1)
    : LOCATIONS.slice(toIndex, fromIndex + 1).reverse()

  const rand = createRng(seed)
  const offsets = []

  for (let i = 0; i < slice.length; i += 1) {
    const progress = slice.length === 1 ? 0.5 : i / (slice.length - 1)
    const wave = 0.5 + 0.32 * Math.sin(progress * Math.PI * (1.7 + rand() * 1.4) + rand() * 4)
    const drift = (rand() - 0.5) * 0.42
    const clustered = rand() > 0.72 ? (rand() > 0.5 ? 0.12 : 0.88) : wave + drift
    offsets.push(Math.min(0.88, Math.max(0.12, clustered)))
  }

  const average =
    offsets.reduce((sum, value) => sum + value, 0) / Math.max(offsets.length, 1)
  const shift = 0.5 - average
  for (let i = 0; i < offsets.length; i += 1) {
    offsets[i] = Math.min(0.86, Math.max(0.14, offsets[i] + shift))
  }

  const points = offsets.map((x, index) => ({
    x: x * 100,
    y: 24 + index * STOP_GAP,
  }))

  let roadPath = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
  for (let i = 1; i < points.length; i += 1) {
    const prev = points[i - 1]
    const next = points[i]
    const dy = next.y - prev.y
    const bulge = (rand() - 0.5) * 48
    const kink = (rand() - 0.5) * 28
    const c1x = prev.x + (next.x - prev.x) * (0.15 + rand() * 0.25) + bulge
    const c1y = prev.y + dy * (0.25 + rand() * 0.2)
    const c2x = prev.x + (next.x - prev.x) * (0.55 + rand() * 0.3) - bulge * 0.55 + kink
    const c2y = prev.y + dy * (0.55 + rand() * 0.25)
    roadPath += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${next.x.toFixed(2)} ${next.y.toFixed(2)}`
  }

  const stops = slice.map((name, index) => {
    const isStart = index === 0
    const isEnd = index === slice.length - 1
    let role = 'junction'
    if (isStart) role = 'start'
    if (isEnd) role = 'destination'

    const side = offsets[index] < 0.5 ? 'right' : 'left'

    return {
      id: `${name}-${index}`,
      name,
      role,
      eta: isStart ? 'Depart now' : `+${index * 45} min`,
      arrival: formatArrival(index),
      x: offsets[index] * 100,
      y: points[index].y,
      side,
    }
  })

  return {
    stops,
    roadPath,
    canvasHeight: points[points.length - 1].y + 28,
  }
}

function resetTripPanels(setters) {
  setters.setActiveStopId(null)
  setters.setExploreStop(null)
  setters.setShopsStop(null)
  setters.setSelectedShopId(null)
  setters.setOrderItems([])
  setters.setOrderStatus('idle')
  setters.setShopRouteHint(null)
  setters.setExplorePlaceRoute(null)
}

function App() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [route, setRoute] = useState(null)
  const [activeStopId, setActiveStopId] = useState(null)
  const [exploreStop, setExploreStop] = useState(null)
  const [shopsStop, setShopsStop] = useState(null)
  const [selectedShopId, setSelectedShopId] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [orderStatus, setOrderStatus] = useState('idle')
  const [shopRouteHint, setShopRouteHint] = useState(null)
  const [explorePlaceRoute, setExplorePlaceRoute] = useState(null)

  const canPlan = from && to && from !== to
  const explorePlaces = exploreStop ? getPlacesForStop(exploreStop.name) : []
  const shops = shopsStop ? getShopsForStop(shopsStop.name) : []
  const shopsByCategory = groupShopsByCategory(shops)
  const selectedShop = shops.find((shop) => shop.id === selectedShopId) ?? null
  const orderTotal = orderItems.reduce((sum, item) => sum + item.price, 0)

  const panelSetters = {
    setActiveStopId,
    setExploreStop,
    setShopsStop,
    setSelectedShopId,
    setOrderItems,
    setOrderStatus,
    setShopRouteHint,
    setExplorePlaceRoute,
  }

  useEffect(() => {
    if (!activeStopId && !exploreStop && !shopsStop) return undefined

    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      if (activeStopId) {
        setActiveStopId(null)
        return
      }
      if (selectedShopId) {
        setSelectedShopId(null)
        return
      }
      if (shopsStop) {
        setShopsStop(null)
        setOrderItems([])
        setOrderStatus('idle')
        setShopRouteHint(null)
        return
      }
      setExploreStop(null)
      setExplorePlaceRoute(null)
    }

    const onPointerDown = (event) => {
      if (!activeStopId) return
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('.junction-menu, .route-stop__card')) return
      setActiveStopId(null)
    }

    window.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
    }
  }, [activeStopId, exploreStop, shopsStop, selectedShopId])

  return (
    <div className="app">
      <header className="top-bar">
        <div className="brand-block">
          <h1 className="brand">LiveTravel</h1>
          <p className="brand-sub">Trip planner layout</p>
        </div>

        <form
          className="route-panel"
          onSubmit={(event) => {
            event.preventDefault()
            if (!canPlan) return
            const seed = seedFromText(`${from}|${to}|${Date.now()}`)
            resetTripPanels(panelSetters)
            setRoute(buildDummyRoute(from, to, seed))
          }}
        >
          <div className="route-fields">
            <div className="field">
              <label htmlFor="from">Current location</label>
              <select
                id="from"
                value={from}
                onChange={(event) => {
                  setFrom(event.target.value)
                  setRoute(null)
                  resetTripPanels(panelSetters)
                }}
              >
                <option value="">Select starting point</option>
                {LOCATIONS.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>

            <div className="route-divider" aria-hidden="true">
              ···
            </div>

            <div className="field">
              <label htmlFor="to">Destination</label>
              <select
                id="to"
                value={to}
                onChange={(event) => {
                  setTo(event.target.value)
                  setRoute(null)
                  resetTripPanels(panelSetters)
                }}
              >
                <option value="">Select destination</option>
                {LOCATIONS.map((place) => (
                  <option key={place} value={place} disabled={place === from}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className="plan-btn" type="submit" disabled={!canPlan}>
            Show best routes
          </button>
        </form>
      </header>

      {route && (
        <>
          <aside className="junction-list" aria-label="Junctions in order">
            <p className="junction-list__label">Junctions</p>
            <ol className="junction-list__items">
              {route.stops.map((stop, index) => (
                <li key={`list-${stop.id}`} className="junction-list__item">
                  <span className="junction-list__index">{index + 1}</span>
                  <span className="junction-list__name">{stop.name}</span>
                  <span className="junction-list__eta">{stop.arrival}</span>
                </li>
              ))}
            </ol>
          </aside>

          <section className="route-map" aria-label="Best route">
            <p className="route-map__label">Best route</p>

            <div
              className="route-canvas"
              style={{ height: `${route.canvasHeight}px` }}
            >
              <svg
                className="route-road"
                viewBox={`0 0 100 ${route.canvasHeight}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d={route.roadPath} />
              </svg>

              <ol className="route-path">
                {route.stops.map((stop, index) => {
                  const isOpen = activeStopId === stop.id

                  return (
                    <li
                      key={stop.id}
                      className={`route-stop route-stop--${stop.role} route-stop--${stop.side}${isOpen ? ' is-open' : ''}`}
                      style={{
                        left: `${stop.x}%`,
                        top: `${stop.y}px`,
                        '--delay': `${index * 0.04}s`,
                      }}
                    >
                      <span className="route-stop__dot" aria-hidden="true" />
                      <button
                        type="button"
                        className="route-stop__card"
                        aria-expanded={isOpen}
                        aria-haspopup="menu"
                        onClick={(event) => {
                          event.stopPropagation()
                          setActiveStopId((current) =>
                            current === stop.id ? null : stop.id,
                          )
                        }}
                      >
                        <div className="route-stop__body">
                          <span className="route-stop__role">
                            {stop.role === 'start' && 'Start'}
                            {stop.role === 'junction' && `Junction ${index}`}
                            {stop.role === 'destination' && 'Destination'}
                          </span>
                          <strong className="route-stop__name">{stop.name}</strong>
                          <span className="route-stop__eta">{stop.eta}</span>
                        </div>
                      </button>

                      {isOpen && (
                        <div
                          className="junction-menu"
                          role="menu"
                          aria-label={`${stop.name} options`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          <p className="junction-menu__title">{stop.name}</p>
                          <button
                            type="button"
                            className="junction-menu__btn junction-menu__btn--primary"
                            onClick={(event) => {
                              event.preventDefault()
                              event.stopPropagation()
                              setShopsStop(null)
                              setSelectedShopId(null)
                              setOrderItems([])
                              setOrderStatus('idle')
                              setShopRouteHint(null)
                              setExplorePlaceRoute(null)
                              setExploreStop({
                                id: stop.id,
                                name: stop.name,
                              })
                              setActiveStopId(null)
                            }}
                          >
                            What&apos;s new to explore here
                          </button>
                          <button
                            type="button"
                            className="junction-menu__btn"
                            onClick={(event) => {
                              event.preventDefault()
                              event.stopPropagation()
                              setExploreStop(null)
                              setExplorePlaceRoute(null)
                              setSelectedShopId(null)
                              setOrderItems([])
                              setOrderStatus('idle')
                              setShopRouteHint(null)
                              setShopsStop({
                                id: stop.id,
                                name: stop.name,
                              })
                              setActiveStopId(null)
                            }}
                          >
                            What all shops are here
                          </button>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ol>
            </div>
          </section>
        </>
      )}

      {exploreStop && (
        <aside className="explore-panel" aria-label={`Places in ${exploreStop.name}`}>
          <div className="explore-panel__head">
            <div>
              <p className="explore-panel__label">Explore here</p>
              <h2 className="explore-panel__place">{exploreStop.name}</h2>
            </div>
            <button
              type="button"
              className="explore-panel__close"
              aria-label="Close places panel"
              onClick={() => {
                setExploreStop(null)
                setExplorePlaceRoute(null)
              }}
            >
              ×
            </button>
          </div>

          <ol className="explore-panel__items">
            {explorePlaces.map((place, index) => (
              <li key={`${exploreStop.id}-${place.name}`} className="explore-panel__item">
                <span className="explore-panel__index">{index + 1}</span>
                <div className="explore-panel__body">
                  <strong className="explore-panel__name">{place.name}</strong>
                  <span className="explore-panel__note">{place.note}</span>
                  <button
                    type="button"
                    className="shop-route-btn shop-route-btn--compact explore-route-btn"
                    onClick={() => {
                      const seed = seedFromText(
                        `${exploreStop.name}|${place.name}|${Date.now()}`,
                      )
                      setExplorePlaceRoute(
                        buildPlaceRoute(exploreStop.name, place.name, seed),
                      )
                    }}
                  >
                    Find route to reach here
                  </button>
                </div>
              </li>
            ))}
          </ol>

          {explorePlaceRoute && (
            <div className="place-route" aria-label="Best route to place">
              <div className="place-route__head">
                <p className="place-route__label">Best route</p>
                <button
                  type="button"
                  className="place-route__close"
                  aria-label="Close place route"
                  onClick={() => setExplorePlaceRoute(null)}
                >
                  ×
                </button>
              </div>
              <p className="place-route__summary">
                {explorePlaceRoute.junctionName} → {explorePlaceRoute.placeName}
              </p>

              <div
                className="place-route__canvas"
                style={{ height: `${explorePlaceRoute.canvasHeight}px` }}
              >
                <svg
                  className="place-route__road"
                  viewBox={`0 0 100 ${explorePlaceRoute.canvasHeight}`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d={explorePlaceRoute.roadPath} />
                </svg>

                <ol className="place-route__path">
                  {explorePlaceRoute.stops.map((stop, index) => (
                    <li
                      key={stop.id}
                      className={`place-route__stop place-route__stop--${stop.role} place-route__stop--${stop.side}`}
                      style={{
                        left: `${stop.x}%`,
                        top: `${stop.y}px`,
                      }}
                    >
                      <span className="place-route__dot" aria-hidden="true" />
                      <div className="place-route__card">
                        <span className="place-route__role">
                          {stop.role === 'start' && 'Start'}
                          {stop.role === 'junction' && `Point ${index}`}
                          {stop.role === 'destination' && 'Place'}
                        </span>
                        <strong className="place-route__name">{stop.name}</strong>
                        <span className="place-route__eta">{stop.eta}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </aside>
      )}

      {shopsStop && (
        <aside className="shops-panel" aria-label={`Shops in ${shopsStop.name}`}>
          <div className="shops-panel__head">
            <div>
              <p className="shops-panel__label">Shops here</p>
              <h2 className="shops-panel__place">{shopsStop.name}</h2>
            </div>
            <button
              type="button"
              className="shops-panel__close"
              aria-label="Close shops panel"
              onClick={() => {
                setShopsStop(null)
                setSelectedShopId(null)
                setOrderItems([])
                setOrderStatus('idle')
              }}
            >
              ×
            </button>
          </div>

          {orderStatus === 'delivered' ? (
            <div className="shops-status shops-status--done">
              <p className="shops-status__title">Delivery on the way</p>
              <p className="shops-status__text">
                Arrival detected at <strong>{shopsStop.name}</strong>. The shop was
                informed and a delivery boy is bringing your order now.
              </p>
              <button
                type="button"
                className="shops-panel__action"
                onClick={() => {
                  setSelectedShopId(null)
                  setOrderItems([])
                  setOrderStatus('idle')
                }}
              >
                Place another order
              </button>
            </div>
          ) : selectedShop ? (
            <div className="shop-detail">
              <button
                type="button"
                className="shop-detail__back"
                onClick={() => {
                  setSelectedShopId(null)
                  setShopRouteHint(null)
                }}
              >
                ← All shops
              </button>

              <div className="shop-photos">
                {getShopImages(selectedShop.id).map((src) => (
                  <img
                    key={src}
                    className="shop-photos__img"
                    src={src}
                    alt={`${selectedShop.name} preview`}
                    loading="lazy"
                  />
                ))}
              </div>

              <p className="shop-detail__category">{selectedShop.category}</p>
              <h3 className="shop-detail__name">{selectedShop.name}</h3>
              <p className="shop-detail__note">{selectedShop.note}</p>

              <button
                type="button"
                className="shop-route-btn"
                onClick={() =>
                  setShopRouteHint(
                    `Dummy route: walk 180m from ${shopsStop.name} junction gate, then turn right near the platform exit to reach ${selectedShop.name}.`,
                  )
                }
              >
                Find route to reach
              </button>

              {shopRouteHint && (
                <p className="shop-route-hint">{shopRouteHint}</p>
              )}

              <ul className="shop-items">
                {selectedShop.items.map((item) => {
                  const ordered = orderItems.some((entry) => entry.id === item.id)
                  return (
                    <li key={item.id} className="shop-item">
                      <div className="shop-item__info">
                        <strong>{item.name}</strong>
                        <span>₹{item.price}</span>
                      </div>
                      <button
                        type="button"
                        className="shop-item__order"
                        disabled={ordered || orderStatus === 'waiting'}
                        onClick={() => {
                          setOrderItems((current) => [...current, item])
                          setOrderStatus('ordered')
                        }}
                      >
                        {ordered ? 'Added' : 'Order'}
                      </button>
                    </li>
                  )
                })}
              </ul>

              {orderItems.length > 0 && (
                <div className="shop-order">
                  <p className="shop-order__summary">
                    {orderItems.length} item(s) · ₹{orderTotal}
                  </p>
                  <p className="shop-order__hint">
                    Pre-order now. On arrival, the shop gets notified automatically.
                  </p>
                  {orderStatus === 'ordered' && (
                    <button
                      type="button"
                      className="shops-panel__action"
                      onClick={() => setOrderStatus('delivered')}
                    >
                      Simulate arrival at {shopsStop.name}
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="shops-groups">
              {Object.entries(shopsByCategory).map(([category, categoryShops]) => (
                <section key={category} className="shops-group">
                  <h3 className="shops-group__title">{category}</h3>
                  <ul className="shops-group__list">
                    {categoryShops.map((shop) => (
                      <li key={shop.id} className="shop-card-wrap">
                        <button
                          type="button"
                          className="shop-card"
                          onClick={() => {
                            setShopRouteHint(null)
                            setSelectedShopId(shop.id)
                          }}
                        >
                          <div className="shop-card__photos">
                            {getShopImages(shop.id).map((src) => (
                              <img
                                key={src}
                                className="shop-card__img"
                                src={src}
                                alt=""
                                loading="lazy"
                              />
                            ))}
                          </div>
                          <div className="shop-card__text">
                            <strong className="shop-card__name">{shop.name}</strong>
                            <span className="shop-card__note">{shop.note}</span>
                            <span className="shop-card__meta">
                              {shop.items.length} items available
                            </span>
                          </div>
                        </button>
                        <button
                          type="button"
                          className="shop-route-btn shop-route-btn--compact"
                          onClick={() =>
                            setShopRouteHint(
                              `Dummy route: from ${shopsStop.name}, follow the main walkway ~2 min to ${shop.name}.`,
                            )
                          }
                        >
                          Find route to reach
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              {shopRouteHint && (
                <p className="shop-route-hint">{shopRouteHint}</p>
              )}
            </div>
          )}
        </aside>
      )}
    </div>
  )
}

export default App
