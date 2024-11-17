import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function Component() {
  const categories = [
    { name: "Programming & Tech", icon: "💻" },
    { name: "Graphics & Design", icon: "🎨" },
    { name: "Digital Marketing", icon: "📱" },
    { name: "Writing & Translation", icon: "✍️" },
    { name: "Video & Animation", icon: "🎥" },
    { name: "AI Services", icon: "🤖" },
    { name: "Music & Audio", icon: "🎵" },
    { name: "Business", icon: "💼" },
    { name: "Consulting", icon: "👥" },
  ];

  const popularServices = [
    {
      title: "Website Development",
      image: "/placeholder.svg?height=400&width=400",
      color: "bg-emerald-700",
    },
    {
      title: "Logo Design",
      image: "/placeholder.svg?height=400&width=400",
      color: "bg-coral-500",
    },
    {
      title: "SEO",
      image: "/placeholder.svg?height=400&width=400",
      color: "bg-green-900",
    },
    {
      title: "Architecture & Interior Design",
      image: "/placeholder.svg?height=400&width=400",
      color: "bg-burgundy-800",
    },
    {
      title: "Social Media Marketing",
      image: "/placeholder.svg?height=400&width=400",
      color: "bg-olive-700",
    },
    {
      title: "Voice Over",
      image: "/placeholder.svg?height=400&width=400",
      color: "bg-brown-900",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-semibold text-xl">
              fiverr<span className="text-green-500">.</span>
            </Link>
            <div className="relative w-[400px]">
              <Input
                className="pl-4 pr-10"
                placeholder="What service are you looking for today?"
                type="search"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <nav className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Fiverr Pro</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <NavigationMenuLink>
                        Professional services
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[400px] p-4">
                      <NavigationMenuLink>Discover services</NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button variant="ghost">English</Button>
            <Button variant="ghost">Become a Seller</Button>
            <Button variant="ghost">Sign in</Button>
            <Button>Join</Button>
          </nav>
        </div>
      </header>

      {/* Categories */}
      <div className="container px-4 py-8">
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href="/"
              className="flex flex-col items-center justify-center p-4 rounded-lg border bg-card text-card-foreground hover:shadow-md transition-shadow"
            >
              <span className="text-2xl mb-2">{category.icon}</span>
              <span className="text-sm text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Services */}
      <div className="container px-4 py-8">
        <h2 className="text-3xl font-semibold mb-8">Popular services</h2>
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
            {popularServices.map((service) => (
              <Card
                key={service.title}
                className="snap-start shrink-0 w-[300px] overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className={`${service.color} p-4 text-white`}>
                    <h3 className="font-semibold">{service.title}</h3>
                  </div>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-lg">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Fiverr Pro Section */}
      <div className="container px-4 py-8 bg-[#f1faf9]">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-semibold text-xl">fiverr</span>
          <span className="text-xl font-semibold text-neutral-700">pro</span>
          <span className="text-xl">.</span>
        </div>
      </div>
    </div>
  );
}
