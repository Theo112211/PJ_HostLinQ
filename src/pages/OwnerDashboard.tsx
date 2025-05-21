
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Edit, Plus, Trash2, CirclePlus, BarChart3, MessageSquare, AlertCircle } from "lucide-react";
import { getUserHostels, deleteHostel, getHostelAnalytics } from "@/services/hostelService";
import { useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { userId, isSignedIn } = useAuth();
  const { toast } = useToast();
  
  const [hostels, setHostels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");

  const loadUserHostels = async () => {
    if (!userId) return;
    
    try {
      setIsLoading(true);
      const userHostels = await getUserHostels(userId);
      setHostels(userHostels);
    } catch (error) {
      console.error("Error loading user hostels:", error);
      toast({
        title: "Error",
        description: "Failed to load your hostels. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalytics = async () => {
    if (!userId) return;
    
    try {
      setIsAnalyticsLoading(true);
      const data = await getHostelAnalytics(userId);
      setAnalytics(data);
    } catch (error) {
      console.error("Error loading analytics:", error);
      toast({
        title: "Error",
        description: "Failed to load analytics data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyticsLoading(false);
    }
  };
  
  useEffect(() => {
    if (activeTab === "listings") {
      loadUserHostels();
    } else if (activeTab === "analytics") {
      loadAnalytics();
    }
  }, [userId, activeTab]);
  
  const handleDeleteHostel = async (hostelId) => {
    if (!userId || !hostelId) return;
    
    try {
      const result = await deleteHostel(hostelId, userId);
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Hostel deleted successfully",
        });
        loadUserHostels(); // Reload the hostels list
      } else {
        toast({
          title: "Error",
          description: "Failed to delete hostel. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error deleting hostel:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const getAvailabilityBadgeColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'limited': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'unavailable': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };
  
  // Redirect to auth if not signed in
  if (!isSignedIn) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="max-w-md mx-auto bg-card p-8 rounded-lg shadow-sm border">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign in Required</h1>
            <p className="text-muted-foreground mb-6 text-center">
              You need to sign in to access your owner dashboard.
            </p>
            <div className="flex flex-col gap-4">
              <Button onClick={() => navigate("/auth?mode=sign-in")} className="w-full">
                Sign In
              </Button>
              <Button onClick={() => navigate("/auth?mode=sign-up")} variant="outline" className="w-full">
                Sign Up
              </Button>
              <Button onClick={() => navigate("/")} variant="ghost" className="w-full">
                Continue as Guest
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div 
        className="container-custom py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Owner Dashboard</h1>
            <p className="text-muted-foreground">Manage your hostel listings and performance</p>
          </div>
          <Button 
            className="mt-4 md:mt-0"
            onClick={() => navigate('/list-hostel')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Hostel
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listings">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-40 rounded-lg bg-muted animate-pulse"></div>
                ))}
              </div>
            ) : hostels.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 gap-6"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
              >
                {hostels.map((hostel) => (
                  <motion.div 
                    key={hostel.id}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      show: { y: 0, opacity: 1, transition: { duration: 0.4 } }
                    }}
                  >
                    <Card>
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4">
                          <div className="h-full relative">
                            <img 
                              src={hostel.image} 
                              alt={hostel.name}
                              className="h-full w-full object-cover aspect-square md:aspect-auto md:rounded-l-lg"
                            />
                          </div>
                        </div>
                        <div className="md:w-3/4">
                          <CardHeader>
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                              <div>
                                <CardTitle className="text-xl">{hostel.name}</CardTitle>
                                <CardDescription>{hostel.location}</CardDescription>
                              </div>
                              <Badge className={`${getAvailabilityBadgeColor(hostel.availability)} capitalize`}>
                                {hostel.availability}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex flex-wrap gap-2 mb-2">
                              <div className="text-sm font-medium">
                                ${hostel.price} {hostel.currency}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Listed {formatDistance(new Date(hostel.created_at), new Date(), { addSuffix: true })}
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {hostel.amenities.slice(0, 3).map((amenity: string) => (
                                <Badge key={amenity} variant="outline">{amenity}</Badge>
                              ))}
                              {hostel.amenities.length > 3 && (
                                <Badge variant="outline">+{hostel.amenities.length - 3} more</Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter>
                            <div className="flex flex-wrap gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/hostel/${hostel.id}`)}
                              >
                                View
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => navigate(`/edit-hostel/${hostel.id}`)}
                              >
                                <Edit className="h-4 w-4 mr-1" /> Edit
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Hostel Listing</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{hostel.name}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction 
                                      onClick={() => handleDeleteHostel(hostel.id)}
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-lg">
                <CirclePlus className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No hostels listed yet</h3>
                <p className="text-muted-foreground mb-6">
                  Create your first hostel listing to start attracting guests
                </p>
                <Button onClick={() => navigate('/list-hostel')}>
                  Create Hostel Listing
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics">
            {isAnalyticsLoading ? (
              <div className="space-y-4">
                <div className="h-80 rounded-lg bg-muted animate-pulse"></div>
                <div className="h-64 rounded-lg bg-muted animate-pulse"></div>
              </div>
            ) : analytics ? (
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="mr-2 h-5 w-5" /> Performance Overview
                    </CardTitle>
                    <CardDescription>
                      Monthly view statistics for all your hostels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ChartContainer
                        config={{
                          views: { label: "Views", color: "hsl(var(--primary))" }
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analytics.viewsByMonth}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Bar
                              dataKey="views"
                              name="views"
                              fill="hsl(var(--primary))"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Hostel Performance</CardTitle>
                    <CardDescription>
                      Engagement metrics for your individual hostel listings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Hostel Name</TableHead>
                          <TableHead className="text-right">Views</TableHead>
                          <TableHead className="text-right">Inquiries</TableHead>
                          <TableHead className="text-right">Conversion Rate</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analytics.hostelPerformance.map((hostel) => {
                          const conversionRate = hostel.views > 0 
                            ? ((hostel.inquiries / hostel.views) * 100).toFixed(1) 
                            : '0';
                            
                          return (
                            <TableRow key={hostel.id}>
                              <TableCell className="font-medium">{hostel.name}</TableCell>
                              <TableCell className="text-right">{hostel.views}</TableCell>
                              <TableCell className="text-right">{hostel.inquiries}</TableCell>
                              <TableCell className="text-right">{conversionRate}%</TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <BarChart3 className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">{analytics.totalHostels}</p>
                            <p className="text-sm text-muted-foreground">Total Hostels</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-3 rounded-full mr-4">
                            <AlertCircle className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="text-lg font-medium">{analytics.conversionRate.toFixed(1)}%</p>
                            <p className="text-sm text-muted-foreground">Average Conversion Rate</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 border border-muted rounded-md">
                          <h4 className="font-medium mb-2">Add more photos</h4>
                          <p className="text-sm text-muted-foreground">
                            Listings with 5+ photos get 50% more views on average.
                          </p>
                        </div>
                        
                        <div className="p-4 border border-muted rounded-md">
                          <h4 className="font-medium mb-2">Update availability</h4>
                          <p className="text-sm text-muted-foreground">
                            Keep your availability status up to date to improve listing accuracy.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No analytics data available</h3>
                  <p className="text-muted-foreground mb-6">
                    Create hostel listings to start tracking performance metrics
                  </p>
                  <Button onClick={() => navigate('/list-hostel')}>
                    Create Hostel Listing
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" /> Messages
                </CardTitle>
                <CardDescription>
                  Communicate with potential and current guests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Messaging features coming soon</p>
                  <p className="text-sm text-muted-foreground">
                    You'll be able to receive and respond to inquiries about your hostels
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </Layout>
  );
};

export default OwnerDashboard;
