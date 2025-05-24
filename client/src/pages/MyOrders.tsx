import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FaArrowLeft, 
  FaShoppingCart, 
  FaLeaf,
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaEye,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

interface Order {
  id: string;
  type: 'buying' | 'selling';
  productName: string;
  quantity: string;
  totalAmount: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  expectedDelivery: string;
  buyerName?: string;
  sellerName?: string;
  contactNumber: string;
  shippingAddress: string;
  productImage: string;
}

export default function MyOrders() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('all');

  // Sample orders data - in real app, this would come from API
  const orders: Order[] = [
    {
      id: 'ORD001',
      type: 'selling',
      productName: 'Premium Rice Husk',
      quantity: '50 kg',
      totalAmount: '₹750',
      status: 'confirmed',
      orderDate: '2024-01-15',
      expectedDelivery: '2024-01-20',
      buyerName: 'Green Valley Farms',
      contactNumber: '+91 98765 43210',
      shippingAddress: 'Village Khanna, District Ludhiana, Punjab - 141401',
      productImage: '/api/placeholder/80/80'
    },
    {
      id: 'ORD002',
      type: 'buying',
      productName: 'Organic Bio Fertilizer',
      quantity: '25 kg',
      totalAmount: '₹1,125',
      status: 'shipped',
      orderDate: '2024-01-12',
      expectedDelivery: '2024-01-18',
      sellerName: 'Eco Farm Solutions',
      contactNumber: '+91 87654 32109',
      shippingAddress: 'Farm House 45, Sector 12, Chandigarh - 160012',
      productImage: '/api/placeholder/80/80'
    },
    {
      id: 'ORD003',
      type: 'selling',
      productName: 'Wheat Straw Bales',
      quantity: '100 kg',
      totalAmount: '₹800',
      status: 'pending',
      orderDate: '2024-01-14',
      expectedDelivery: '2024-01-22',
      buyerName: 'Agricultural Supplies Co.',
      contactNumber: '+91 76543 21098',
      shippingAddress: 'Industrial Area, Phase 2, Mohali - 160055',
      productImage: '/api/placeholder/80/80'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <FaClock className="h-4 w-4" />;
      case 'confirmed': return <FaCheckCircle className="h-4 w-4" />;
      case 'shipped': return <FaTruck className="h-4 w-4" />;
      case 'delivered': return <FaCheckCircle className="h-4 w-4" />;
      case 'cancelled': return <FaExclamationTriangle className="h-4 w-4" />;
      default: return <FaClock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'buying') return order.type === 'buying';
    if (activeTab === 'selling') return order.type === 'selling';
    return true;
  });

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start space-x-4">
          <img 
            src={order.productImage} 
            alt={order.productName}
            className="w-20 h-20 object-cover rounded-lg"
          />
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg">{order.productName}</h3>
                <p className="text-sm text-gray-600">Order #{order.id}</p>
                <p className="text-sm text-gray-600">{order.quantity}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-green-600">{order.totalAmount}</p>
                <Badge className={`${getStatusColor(order.status)} flex items-center space-x-1`}>
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </Badge>
              </div>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p><strong>Expected Delivery:</strong> {new Date(order.expectedDelivery).toLocaleDateString()}</p>
              {order.type === 'selling' && order.buyerName && (
                <p><strong>Buyer:</strong> {order.buyerName}</p>
              )}
              {order.type === 'buying' && order.sellerName && (
                <p><strong>Seller:</strong> {order.sellerName}</p>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaMapMarkerAlt className="h-3 w-3" />
              <span className="truncate">{order.shippingAddress}</span>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button size="sm" variant="outline" className="flex-1">
                <FaEye className="mr-2 h-3 w-3" />
                View Details
              </Button>
              <Button size="sm" variant="outline">
                <FaPhone className="mr-2 h-3 w-3" />
                Contact
              </Button>
              {order.status === 'pending' && order.type === 'selling' && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Accept
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const OrderStats = () => {
    const stats = [
      { label: 'Total Orders', value: orders.length, icon: FaShoppingCart },
      { label: 'Active Orders', value: orders.filter(o => ['pending', 'confirmed', 'shipped'].includes(o.status)).length, icon: FaClock },
      { label: 'Completed', value: orders.filter(o => o.status === 'delivered').length, icon: FaCheckCircle },
      { label: 'Total Value', value: '₹2,675', icon: FaLeaf }
    ];

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-gray-600" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center space-x-4 p-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setLocation('/farmer')}
          >
            <FaArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <OrderStats />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="buying">Buying</TabsTrigger>
            <TabsTrigger value="selling">Selling</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="buying">
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="selling">
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <FaShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-4">
              {activeTab === 'buying' ? 'You haven\'t made any purchases yet' : 
               activeTab === 'selling' ? 'You haven\'t received any orders yet' : 
               'You don\'t have any orders yet'}
            </p>
            <Button onClick={() => setLocation('/')}>
              {activeTab === 'buying' ? 'Start Shopping' : 'List Your Products'}
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}