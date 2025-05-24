import React, { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import Webcam from 'react-webcam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  FaCamera, 
  FaArrowLeft, 
  FaUpload, 
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle,
  FaRobot,
  FaBrain
} from 'react-icons/fa';
import { useToast } from '@/hooks/use-toast';

enum ScanState {
  CAMERA = 'camera',
  ANALYZING = 'analyzing',
  RESULTS = 'results',
  LISTING = 'listing'
}

interface WasteAnalysis {
  wasteType: string;
  confidence: number;
  suggestedPrice: number;
  description: string;
  category: string;
  qualityGrade: string;
  recommendations: string[];
}

export default function SellWaste() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const webcamRef = useRef<Webcam>(null);
  
  const [scanState, setScanState] = useState<ScanState>(ScanState.CAMERA);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null);
  
  // Form data for listing
  const [formData, setFormData] = useState({
    wasteType: '',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    description: '',
    location: '',
    availableFrom: ''
  });

  const wasteTypes = [
    'Rice Husk',
    'Wheat Straw',
    'Corn Stalks',
    'Sugarcane Bagasse',
    'Cotton Stalks',
    'Coconut Coir',
    'Fruit Peels',
    'Vegetable Waste',
    'Crop Residues',
    'Other'
  ];

  const units = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'quintal', label: 'Quintal (100 kg)' },
    { value: 'tons', label: 'Tons (1000 kg)' }
  ];

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setScanState(ScanState.ANALYZING);
      setIsAnalyzing(true);
      
      // Simulate ML/LLM analysis - This is where you'll integrate real AI models
      setTimeout(() => {
        const mockAnalysis: WasteAnalysis = {
          wasteType: 'Rice Husk',
          confidence: 0.89,
          suggestedPrice: 18,
          description: 'High-quality rice husk suitable for composting and bio-fuel production',
          category: 'Crop Residues',
          qualityGrade: 'Grade A',
          recommendations: [
            'Clean and dry for better pricing',
            'Bundle in 50kg bags for easier handling',
            'Store in dry place to maintain quality'
          ]
        };
        
        setAnalysis(mockAnalysis);
        setFormData(prev => ({
          ...prev,
          wasteType: mockAnalysis.wasteType,
          pricePerUnit: mockAnalysis.suggestedPrice.toString()
        }));
        setIsAnalyzing(false);
        setScanState(ScanState.RESULTS);
      }, 3000);
    }
  };

  const proceedToListing = () => {
    setScanState(ScanState.LISTING);
  };

  const submitListing = async () => {
    try {
      // Here you would integrate with your backend API
      toast({
        title: "Success!",
        description: "Your waste listing has been created successfully.",
      });
      setLocation('/farmer');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create listing. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderCamera = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FaCamera className="h-5 w-5" />
            <span>Scan Your Agricultural Waste</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative rounded-lg overflow-hidden bg-gray-900">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 border-2 border-dashed border-white/50 m-4 rounded-lg"></div>
          </div>
          
          <div className="mt-4 space-y-4">
            <Button onClick={captureImage} className="w-full" size="lg">
              <FaCamera className="mr-2 h-5 w-5" />
              Capture Image
            </Button>
            
            <div className="text-center text-sm text-gray-600">
              <p>Position your agricultural waste in the camera frame</p>
              <p>Our AI will identify the type and suggest pricing</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ML/LLM Integration Information */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <FaBrain className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">AI-Powered Analysis</h3>
              <p className="text-sm text-blue-800 mb-2">
                Our advanced machine learning models will:
              </p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Identify waste type with high accuracy</li>
                <li>• Suggest optimal pricing based on market data</li>
                <li>• Assess quality and provide recommendations</li>
                <li>• Match with potential buyers automatically</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalyzing = () => (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="space-y-4">
          <FaSpinner className="h-16 w-16 text-blue-600 mx-auto animate-spin" />
          <h3 className="text-xl font-semibold">Analyzing Your Waste...</h3>
          <p className="text-gray-600">
            Our AI is identifying the waste type and calculating optimal pricing
          </p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <p>✓ Image quality assessment complete</p>
            <p>🔄 Running waste classification model...</p>
            <p>⏳ Calculating market-based pricing...</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderResults = () => (
    <div className="space-y-6">
      {capturedImage && (
        <Card>
          <CardContent className="p-4">
            <img 
              src={capturedImage} 
              alt="Captured waste" 
              className="w-full h-48 object-cover rounded-lg"
            />
          </CardContent>
        </Card>
      )}

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <FaCheckCircle className="h-5 w-5" />
            <span>Analysis Complete!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-green-700">Detected Waste Type</Label>
                  <p className="text-lg font-semibold">{analysis.wasteType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-green-700">Confidence</Label>
                  <p className="text-lg font-semibold">{(analysis.confidence * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-green-700">Suggested Price</Label>
                  <p className="text-lg font-semibold text-green-600">₹{analysis.suggestedPrice}/kg</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-green-700">Quality Grade</Label>
                  <Badge variant="secondary">{analysis.qualityGrade}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-green-700">Description</Label>
                <p className="text-sm text-gray-700">{analysis.description}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-green-700">Recommendations</Label>
                <ul className="text-sm text-gray-700 space-y-1 mt-1">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div className="flex space-x-3 pt-4">
            <Button onClick={() => setScanState(ScanState.CAMERA)} variant="outline" className="flex-1">
              Scan Again
            </Button>
            <Button onClick={proceedToListing} className="flex-1">
              Create Listing
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderListing = () => (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Waste Listing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="wasteType">Waste Type</Label>
            <Select value={formData.wasteType} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, wasteType: value }))
            }>
              <SelectTrigger>
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent>
                {wasteTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
              placeholder="Enter quantity"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Select value={formData.unit} onValueChange={(value) => 
              setFormData(prev => ({ ...prev, unit: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map(unit => (
                  <SelectItem key={unit.value} value={unit.value}>{unit.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="pricePerUnit">Price per {formData.unit}</Label>
            <Input
              id="pricePerUnit"
              type="number"
              value={formData.pricePerUnit}
              onChange={(e) => setFormData(prev => ({ ...prev, pricePerUnit: e.target.value }))}
              placeholder="Enter price"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your waste, its condition, and any special features..."
            rows={4}
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Enter your location"
          />
        </div>

        <div>
          <Label htmlFor="availableFrom">Available From</Label>
          <Input
            id="availableFrom"
            type="date"
            value={formData.availableFrom}
            onChange={(e) => setFormData(prev => ({ ...prev, availableFrom: e.target.value }))}
          />
        </div>

        <div className="flex space-x-3 pt-4">
          <Button onClick={() => setScanState(ScanState.RESULTS)} variant="outline" className="flex-1">
            Back to Results
          </Button>
          <Button onClick={submitListing} className="flex-1">
            <FaUpload className="mr-2 h-4 w-4" />
            Create Listing
          </Button>
        </div>
      </CardContent>
    </Card>
  );

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
          <h1 className="text-xl font-bold text-gray-900">Sell Your Waste</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {scanState === ScanState.CAMERA && renderCamera()}
        {scanState === ScanState.ANALYZING && renderAnalyzing()}
        {scanState === ScanState.RESULTS && renderResults()}
        {scanState === ScanState.LISTING && renderListing()}
      </main>
    </div>
  );
}