"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

interface Message {
  id: string;
  role: "civile" | "bot";
  text: string;
  time: string;
}

const now = () => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

let n = 0;
const uid = () => `msg_${Date.now()}_${n++}`;

// Signalement fictif pré-chargé (contenu générique, adapté à une démo technique).
const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg_1",
    role: "civile",
    text: "Bonjour, je souhaite signaler un mouvement de véhicules non identifiés près du rond-point du village.",
    time: "14:02",
  },
  {
    id: "msg_2",
    role: "bot",
    text: "Signalement reçu. Merci. Votre message a été enregistré sous le numéro de suivi simulé №004821. Un accusé de réception automatisé suit.",
    time: "14:02",
  },
  {
    id: "msg_3",
    role: "bot",
    text: "Accusé de réception : votre signalement fictif a été transmis aux opérateurs (simulation). Ne partagez jamais d'informations réelles dans cette démo.",
    time: "14:03",
  },
];

// Simulation d'interface eVorog : chat démo avec accusé de réception automatisé.
// Aucune transmission réelle n'a lieu — bandeau affiché en permanence.
export function EvorogClient() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  async function send() {
    const t = text.trim();
    if (!t) return;
    setSending(true);
    try {
      // Message du civil affiché immédiatement dans le fil.
      const civilMessage: Message = {
        id: uid(),
        role: "civile",
        text: t,
        time: now(),
      };
      setMessages((ms) => [...ms, civilMessage]);
      setText("");

      // Réponse automatisée simulée (pas de transmission réelle).
      const reply: Message = {
        id: uid(),
        role: "bot",
        text: "Merci, signalement transmis (simulation). Votre message n'a été ni envoyé ni traité : cette interface est une reproduction de démonstration.",
        time: now(),
      };
      setTimeout(() => setMessages((ms) => [...ms, reply]), 400);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm text-foreground">
        <span className="font-semibold">Simulation d'interface —</span> aucune
        transmission réelle. Le vrai chatbot eVorog est un bot Telegram officiel
        ; ici, aucun message n'est envoyé ni stocké côté externe.
      </div>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between gap-2">
            <CardTitle className="text-base">Chat eVorog (démo)</CardTitle>
            <Badge variant="secondary">Telegram · simulé</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-3 max-h-96 space-y-2 overflow-y-auto rounded-md border p-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "civile"
                    ? "ml-auto max-w-[80%] rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground"
                    : "mr-auto max-w-[80%] rounded-lg bg-muted px-3 py-2 text-sm"
                }
              >
                <p className="mb-0.5 text-xs opacity-70">
                  {m.role === "civile" ? "Civil·le" : "eVorog (bot)"} · {m.time}
                </p>
                <p>{m.text}</p>
              </div>
            ))}
          </div>

          <div className="flex items-end gap-2">
            <Label htmlFor="evorog-input" className="sr-only">
              Votre signalement fictif
            </Label>
            <Input
              id="evorog-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Saisir un signalement fictif…"
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
            />
            <Button onClick={send} disabled={sending || !text.trim()}>
              {sending ? "Envoi…" : "Envoyer"}
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Démo : le message s'affiche dans le fil local et une réponse
            automatisée « signalement transmis » est générée. Aucune donnée
            quitte cette page de démonstration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
