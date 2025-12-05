'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin,
    Search,
    Star,
    Clock,
    Heart,
    ShoppingBag,
    Menu,
    Filter,
    Navigation,
    Plus,
    Minus,
    ChevronRight
} from 'lucide-react'

const CATEGORIES = [
    { id: 'all', label: 'All', icon: '🍽️' },
    { id: 'pizza', label: 'Pizza', icon: '🍕' },
    { id: 'burger', label: 'Burger', icon: '🍔' },
    { id: 'asian', label: 'Asian', icon: '🍜' },
    { id: 'dessert', label: 'Dessert', icon: '🍰' },
    { id: 'healthy', label: 'Healthy', icon: '🥗' },
]

const RESTAURANTS = [
    {
        id: 1,
        name: 'Burger & Co.',
        rating: 4.8,
        time: '25-35 min',
        delivery: '$1.99',
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
        tags: ['Burger', 'American'],
        price: '$$'
    },
    {
        id: 2,
        name: 'Sushi Master',
        rating: 4.9,
        time: '45-55 min',
        delivery: 'Free',
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
        tags: ['Japanese', 'Sushi'],
        price: '$$$'
    },
    {
        id: 3,
        name: 'Pizza Paradiso',
        rating: 4.5,
        time: '30-40 min',
        delivery: '$2.49',
        image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80',
        tags: ['Italian', 'Pizza'],
        price: '$$'
    },
    {
        id: 4,
        name: 'Green Bowl',
        rating: 4.7,
        time: '20-30 min',
        delivery: '$1.49',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
        tags: ['Healthy', 'Vegan'],
        price: '$'
    }
]

export default function UrbanEatsDemo() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [cartCount, setCartCount] = useState(2)
    const [liked, setLiked] = useState<number[]>([1])

    const toggleLike = (id: number) => {
        if (liked.includes(id)) {
            setLiked(liked.filter(i => i !== id))
        } else {
            setLiked([...liked, id])
        }
    }

    return (
        <div className="flex h-full bg-slate-50 font-sans overflow-hidden text-slate-900">
            {/* Sidebar Navigation */}
            <div className="w-20 bg-white border-r border-slate-200 flex flex-col items-center py-8 shrink-0 z-20">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-8 shadow-lg shadow-orange-500/30">
                    U
                </div>
                <nav className="flex-1 flex flex-col gap-6 w-full">
                    <NavItem icon={Menu} active />
                    <NavItem icon={Heart} />
                    <NavItem icon={Clock} />
                    <NavItem icon={Settings} />
                </nav>
                <div className="relative">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-orange-50 hover:text-orange-500 transition-colors cursor-pointer">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                            {cartCount}
                        </span>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-4 py-2 rounded-full hover:bg-slate-200 transition-colors cursor-pointer">
                            <MapPin className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium text-slate-700">New York, 5th Avenue</span>
                            <ChevronDown className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="flex-1 max-w-xl mx-8 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search for restaurants, cuisines..."
                            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-100 border-none text-sm focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors">
                            <Filter className="w-5 h-5 text-slate-600" />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                            <img src="https://i.pravatar.cc/150?u=urban" alt="User" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {/* Hero Banner */}
                    <div className="relative h-64 rounded-3xl overflow-hidden mb-10 group cursor-pointer">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80"
                            alt="Hero"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-10 text-white">
                            <span className="px-3 py-1 bg-orange-500 rounded-full text-xs font-bold w-fit mb-4">Free Delivery</span>
                            <h2 className="text-4xl font-bold mb-2">Taste the Best <br /> Asian Cuisine</h2>
                            <p className="text-white/80 mb-6 max-w-md">Get 20% off on your first order from selected Asian restaurants. Limited time offer.</p>
                            <button className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold w-fit hover:bg-orange-50 transition-colors">
                                Order Now
                            </button>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-slate-800">Categories</h3>
                            <button className="text-orange-500 text-sm font-medium hover:underline">See all</button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex flex-col items-center gap-3 min-w-[100px] p-4 rounded-2xl transition-all ${activeCategory === cat.id
                                        ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                                        : 'bg-white text-slate-600 hover:bg-orange-50 border border-slate-100'
                                        }`}
                                >
                                    <span className="text-2xl">{cat.icon}</span>
                                    <span className="text-sm font-medium">{cat.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Popular Restaurants */}
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-6">Popular Near You</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {RESTAURANTS.map((restaurant) => (
                                <motion.div
                                    key={restaurant.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={restaurant.image}
                                            alt={restaurant.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                toggleLike(restaurant.id)
                                            }}
                                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-transform active:scale-90"
                                        >
                                            <Heart className={`w-4 h-4 ${liked.includes(restaurant.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                                        </button>
                                        <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-slate-800 flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-orange-500" />
                                            {restaurant.time}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-bold text-lg text-slate-800">{restaurant.name}</h4>
                                            <div className="flex items-center gap-1 bg-green-100 px-1.5 py-0.5 rounded text-xs font-bold text-green-700">
                                                <Star className="w-3 h-3 fill-current" />
                                                {restaurant.rating}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                                            {restaurant.tags.map((tag, i) => (
                                                <span key={i}>{tag} {i < restaurant.tags.length - 1 && '•'}</span>
                                            ))}
                                            <span>•</span>
                                            <span className="text-slate-400">{restaurant.price}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                            <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                                <Navigation className="w-3 h-3" />
                                            </div>
                                            <span>{restaurant.delivery === 'Free' ? 'Free Delivery' : `${restaurant.delivery} Delivery`}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* Right Sidebar: Cart/Order (Simulated) */}
            <div className="w-80 bg-white border-l border-slate-200 p-6 flex flex-col shrink-0 z-20">
                <h3 className="text-lg font-bold text-slate-800 mb-6">My Order</h3>

                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                    <div className="bg-orange-50 rounded-2xl p-4 border border-orange-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">In Progress</span>
                            <span className="text-xs font-medium text-orange-600">15 min left</span>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&q=80" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <p className="text-sm font-bold text-slate-800">Burger & Co.</p>
                                <p className="text-xs text-slate-500">2 items</p>
                            </div>
                        </div>
                        <div className="w-full bg-orange-200 h-1.5 rounded-full overflow-hidden">
                            <div className="w-2/3 h-full bg-orange-500 rounded-full" />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold text-slate-800 mb-4">Cart Items</h4>
                        <div className="space-y-4">
                            <CartItem name="Spicy Chicken Burger" price={12.99} image="https://images.unsplash.com/photo-1615297928064-24977384d0f5?w=100&q=80" />
                            <CartItem name="French Fries (L)" price={4.50} image="https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=100&q=80" />
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100">
                    <div className="flex justify-between mb-2 text-sm">
                        <span className="text-slate-500">Subtotal</span>
                        <span className="font-medium text-slate-800">$17.49</span>
                    </div>
                    <div className="flex justify-between mb-4 text-sm">
                        <span className="text-slate-500">Delivery</span>
                        <span className="font-medium text-slate-800">$1.99</span>
                    </div>
                    <div className="flex justify-between mb-6 text-lg font-bold">
                        <span className="text-slate-800">Total</span>
                        <span className="text-slate-800">$19.48</span>
                    </div>
                    <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}

const NavItem = ({ icon: Icon, active }: any) => (
    <button className={`w-full flex justify-center py-3 border-r-2 transition-all ${active ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>
        <Icon className="w-6 h-6" />
    </button>
)

const Settings = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
)

const ChevronDown = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
    </svg>
)

const CartItem = ({ name, price, image }: any) => (
    <div className="flex items-center gap-3">
        <img src={image} alt={name} className="w-14 h-14 rounded-xl object-cover" />
        <div className="flex-1">
            <h5 className="text-sm font-bold text-slate-800 line-clamp-1">{name}</h5>
            <p className="text-sm font-medium text-slate-500">${price.toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200">
                <Minus className="w-3 h-3" />
            </button>
            <span className="text-sm font-bold text-slate-800">1</span>
            <button className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800">
                <Plus className="w-3 h-3" />
            </button>
        </div>
    </div>
)
