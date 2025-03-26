import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Theory from "@/pages/Theory";
import Experiments from "@/pages/Experiments";
import Help from "@/pages/Help";
import Game from "@/pages/Game";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      <Route path="/theory" component={Theory}/>
      <Route path="/experiments" component={Experiments}/>
      <Route path="/help" component={Help}/>
      <Route path="/game" component={Game}/>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App min-h-screen bg-slate-50">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;
