import { useEffect, useState } from "react";

export interface DropCard {
  id: number;
  quote: string;
  quote_author: string;
  main_category: string;
  subtitle: string;
  category: string;
  product_name: string;
  product_image: string;
  overlay_tag: string;
  availability_text: string;
  drop_date: string;
  description: string;
  cta_text: string;
}

export const useDrops = () => {
  const [drops, setDrops] = useState<DropCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/drops/")
      .then((res) => res.json())
      .then((data) => {
        setDrops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load drops");
        setLoading(false);
      });
  }, []);

  return { drops, loading, error };
};
