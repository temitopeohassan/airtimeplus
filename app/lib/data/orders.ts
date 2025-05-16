import { OrderType } from '@/lib/types';

export const ORDERS: OrderType[] = [
  {
    id: 'ORD-001',
    date: 'November 15, 2023',
    status: 'completed',
    items: [
      {
        title: 'Modern Dashboard UI Kit',
        price: 49.99,
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        license: 'Extended'
      },
      {
        title: 'Minimalist Icon Pack',
        price: 24.99,
        image: 'https://images.pexels.com/photos/5926389/pexels-photo-5926389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        license: 'Standard'
      }
    ],
    subtotal: 74.98,
    total: 74.98,
    paymentMethod: 'Credit Card (Visa ****4532)'
  },
  {
    id: 'ORD-002',
    date: 'October 23, 2023',
    status: 'completed',
    items: [
      {
        title: 'WordPress Blog Theme',
        price: 59.99,
        image: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        license: 'Standard'
      }
    ],
    subtotal: 59.99,
    total: 59.99,
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-003',
    date: 'September 18, 2023',
    status: 'processing',
    items: [
      {
        title: 'Form Validation Script',
        price: 19.99,
        image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        license: 'Standard'
      },
      {
        title: 'SEO Analytics Plugin',
        price: 29.99,
        image: 'https://images.pexels.com/photos/8470865/pexels-photo-8470865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        license: 'Extended'
      },
      {
        title: 'Animated UI Transitions',
        price: 17.99,
        image: 'https://images.pexels.com/photos/196646/pexels-photo-196646.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        license: 'Standard'
      }
    ],
    subtotal: 67.97,
    total: 67.97,
    paymentMethod: 'Credit Card (Mastercard ****7865)'
  },
  {
    id: 'ORD-004',
    date: 'August 5, 2023',
    status: 'refunded',
    items: [
      {
        title: 'Premium Serif Font Family',
        price: 34.99,
        image: 'https://images.pexels.com/photos/6393345/pexels-photo-6393345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        license: 'Extended'
      }
    ],
    subtotal: 34.99,
    total: 34.99,
    paymentMethod: 'PayPal'
  }
];