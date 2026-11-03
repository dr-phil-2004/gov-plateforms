import { seedAll } from "@/lib/store";

// Initialise les données fictives une seule fois par processus serveur.
// Aucun appel vers un service externe et aucun effet sur le mode de production.
seedAll();
