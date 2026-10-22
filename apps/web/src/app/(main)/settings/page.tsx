"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Check,
  CheckCircle2,
  Code2,
  Globe,
  Key,
  Keyboard,
  Laptop,
  Loader2,
  Lock,
  Moon,
  Palette,
  Settings,
  Sparkles,
  Sun,
  Terminal,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { authClient } from "~/auth/client";
import { useSignIn } from "~/components/sign-in-dialog";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Kbd } from "~/components/ui/kbd";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { FONT_OPTIONS, useEditorSettings } from "~/hooks/use-editor-settings";
import { getAvatarUrl } from "~/lib/avatar";
import { cn } from "~/lib/utils";
import { useTRPC } from "~/trpc/react";

export default function SettingsPage() {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();
  const editor = useEditorSettings();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const { openSignIn } = useSignIn();

  const user = session?.user;
  const username = user?.username ?? "";

  // Profile data query
  const { data: profile, isLoading: profileLoading } = useQuery(
    trpc.profile.byUsername.queryOptions(
      { username },
      { enabled: !!username },
    ),
  );

  // Profile form state
  const [fullname, setFullname] = useState("");
  const [bio, setBio] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    if (profile) {
      setFullname(profile.fullname ?? "");
      setBio(profile.bio ?? "");
      setGithubUrl(profile.githubUrl ?? "");
      setTwitterUrl(profile.twitterUrl ?? "");
      setLinkedinUrl(profile.linkedinUrl ?? "");
      setWebsiteUrl(profile.websiteUrl ?? "");
    }
  }, [profile]);

  // Update profile mutation
  const updateProfileMutation = useMutation(
    trpc.profile.updateProfile.mutationOptions({
      onSuccess: () => {
        toast.success("Profile updated successfully");
        if (username) {
          void queryClient.invalidateQueries(
            trpc.profile.byUsername.queryFilter({ username }),
          );
        }
      },
      onError: (err) => {
        toast.error(err.message ?? "Failed to update profile");
      },
    }),
  );

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate({
      fullname: fullname.trim() || undefined,
      bio: bio.trim() || undefined,
      githubUrl: githubUrl.trim() || undefined,
      twitterUrl: twitterUrl.trim() || undefined,
      linkedinUrl: linkedinUrl.trim() || undefined,
      websiteUrl: websiteUrl.trim() || undefined,
    });
  };

  if (sessionLoading) {
    return (
      <div className="container mx-auto flex min-h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-lg px-4 py-20 text-center">
        <Settings className="mx-auto size-10 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Sign in to access settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your developer profile, editor preferences, and personal defaults.
        </p>
        <Button
          onClick={() => openSignIn({ source: "settings", callbackURL: "/settings" })}
          className="mt-6 bg-primary text-primary-foreground font-semibold"
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Settings & Preferences
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Customize your coding environment, profile information, and developer workflows.
        </p>
      </div>

      <Tabs defaultValue="editor" className="space-y-6">
        <TabsList className="bg-card border border-border p-1">
          <TabsTrigger value="editor" className="gap-2 text-xs font-medium">
            <Terminal className="size-3.5" />
            <span>Editor & Workspace</span>
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2 text-xs font-medium">
            <User className="size-3.5" />
            <span>Profile & Social</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2 text-xs font-medium">
            <Palette className="size-3.5" />
            <span>Theme & Shortcuts</span>
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Editor & Workspace Preferences */}
        <TabsContent value="editor" className="space-y-6">
          <Card className="border-border bg-card/60">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-bold">Code Editor Preferences</CardTitle>
              <CardDescription className="text-xs">
                Settings persist across Algorithmic Challenges, Collaborative Rooms, and the Playground.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-5">
              {/* Font Family */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
                <div>
                  <Label className="text-sm font-medium">Font Family</Label>
                  <p className="text-xs text-muted-foreground">Monospace typeface for code</p>
                </div>
                <div className="sm:col-span-2">
                  <Select
                    value={editor.fontFamily}
                    onValueChange={(val) => editor.set({ fontFamily: val })}
                  >
                    <SelectTrigger className="w-full sm:w-64">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {FONT_OPTIONS.map((f) => (
                        <SelectItem key={f.value} value={f.value}>
                          <span style={{ fontFamily: f.value }}>{f.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Font Size */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
                <div>
                  <Label className="text-sm font-medium">Font Size</Label>
                  <p className="text-xs text-muted-foreground">Editor text size in pixels</p>
                </div>
                <div className="sm:col-span-2 flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.set({ fontSize: Math.max(11, editor.fontSize - 1) })}
                    disabled={editor.fontSize <= 11}
                  >
                    -
                  </Button>
                  <span className="font-mono text-sm w-12 text-center">{editor.fontSize}px</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => editor.set({ fontSize: Math.min(22, editor.fontSize + 1) })}
                    disabled={editor.fontSize >= 22}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Tab Size */}
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:items-center">
                <div>
                  <Label className="text-sm font-medium">Tab Size</Label>
                  <p className="text-xs text-muted-foreground">Indentation spacing</p>
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  {[2, 4].map((size) => (
                    <Button
                      key={size}
                      type="button"
                      variant={editor.tabSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => editor.set({ tabSize: size })}
                      className="font-mono text-xs w-16"
                    >
                      {size} spaces
                    </Button>
                  ))}
                </div>
              </div>

              {/* Font Ligatures */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <Label className="text-sm font-medium">Font Ligatures</Label>
                  <p className="text-xs text-muted-foreground">Enable code symbol ligatures (e.g. =&gt;, ===, !=)</p>
                </div>
                <Switch
                  checked={editor.fontLigatures}
                  onCheckedChange={(val) => editor.set({ fontLigatures: val })}
                />
              </div>

              {/* AI Ghost-Text Completion */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <Label className="text-sm font-medium">AI Inline Completion</Label>
                  <p className="text-xs text-muted-foreground">Provide smart ghost-text suggestions while typing code</p>
                </div>
                <Switch
                  checked={editor.aiCompletion}
                  onCheckedChange={(val) => editor.set({ aiCompletion: val })}
                />
              </div>

              {/* Vim Keybindings */}
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <Label className="text-sm font-medium">Vim Keybindings</Label>
                  <p className="text-xs text-muted-foreground">Enable modal Vim navigation inside the code editor</p>
                </div>
                <Switch
                  checked={editor.keymap === "vim"}
                  onCheckedChange={(val) => editor.set({ keymap: val ? "vim" : "default" })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Profile & Social */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-border bg-card/60">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-bold">Public Developer Profile</CardTitle>
              <CardDescription className="text-xs">
                Visible on your Coding Bird profile at{" "}
                <Link href={`/u/${username}`} className="text-primary hover:underline">
                  /u/{username}
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                      id="fullname"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      placeholder="e.g. Alex Johnson"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      disabled
                      className="bg-muted/50 text-muted-foreground cursor-not-allowed font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell other engineers what you're building, your focus areas, or engineering interests..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="twitterUrl">Twitter / X</Label>
                    <Input
                      id="twitterUrl"
                      type="url"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      placeholder="https://x.com/..."
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="websiteUrl">Personal Website</Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://yourname.dev"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="bg-primary text-primary-foreground font-semibold"
                  >
                    {updateProfileMutation.isPending && (
                      <Loader2 className="mr-2 size-4 animate-spin" />
                    )}
                    Save Profile
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Theme & Shortcuts */}
        <TabsContent value="appearance" className="space-y-6">
          <Card className="border-border bg-card/60">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-bold">Theme & Visual Mode</CardTitle>
              <CardDescription className="text-xs">
                Select your preferred visual mode for Coding Bird.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-3 gap-3 max-w-md">
                {[
                  { id: "dark", label: "Dark", icon: Moon },
                  { id: "light", label: "Light", icon: Sun },
                  { id: "system", label: "System", icon: Laptop },
                ].map((mode) => {
                  const isSelected = theme === mode.id;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setTheme(mode.id)}
                      className={cn(
                        "flex flex-col items-center justify-center rounded-lg border p-4 text-center transition-all",
                        isSelected
                          ? "border-primary bg-accent text-foreground font-semibold shadow-xs"
                          : "border-border bg-card/40 hover:bg-card text-muted-foreground",
                      )}
                    >
                      <mode.icon className="size-5 mb-2" />
                      <span className="text-xs">{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts Reference */}
          <Card className="border-border bg-card/60">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Keyboard className="size-4 text-primary" />
                Global Keyboard Shortcuts
              </CardTitle>
              <CardDescription className="text-xs">
                High-productivity keyboard shortcuts supported across Coding Bird.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-xs font-medium">Command Palette & Quick Search</span>
                  <div className="flex items-center gap-1">
                    <Kbd>⌘</Kbd> <Kbd>K</Kbd>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-xs font-medium">Quick Search Problem (Global)</span>
                  <Kbd>/</Kbd>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-xs font-medium">Execute / Run Code in Editor</span>
                  <div className="flex items-center gap-1">
                    <Kbd>⌘</Kbd> <Kbd>Enter</Kbd>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-xs font-medium">Submit Solution to Judge</span>
                  <div className="flex items-center gap-1">
                    <Kbd>⌘</Kbd> <Kbd>Shift</Kbd> <Kbd>Enter</Kbd>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-xs font-medium">Dismiss Modals / Overlays</span>
                  <Kbd>Esc</Kbd>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-3">
                  <span className="text-xs font-medium">Format Code in Monaco Workspace</span>
                  <div className="flex items-center gap-1">
                    <Kbd>Shift</Kbd> <Kbd>Alt</Kbd> <Kbd>F</Kbd>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
