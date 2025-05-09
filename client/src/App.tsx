import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Splash from "@/pages/Splash";
import Login from "@/pages/Login";
import SimpleHome from "@/pages/SimpleHome";
import Cart from "@/pages/Cart";
import Categories from "@/pages/Categories";
import CategoryDetail from "@/pages/CategoryDetail";

// Temp import for backward compatibility
import Home from "@/pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={SimpleHome} />
      <Route path="/cart" component={Cart} />
      <Route path="/categories" component={Categories} />
      <Route path="/categories/:id" component={CategoryDetail} />
      
      {/* Backward compatibility */}
      <Route path="/old-home" component={Home} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
