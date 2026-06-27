import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CarFormProps {
  onSuccess: () => void;
}

const CarForm = ({ onSuccess }: CarFormProps) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    color: "",
    country: "",
    status: "متاح",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const { error } = await supabase
      .from("cars")
      .insert([
        {
          ...formData,
          year: Number(formData.year),
          price: formData.price,
        },
      ]);

    if (error) {
      console.error(error);
      return;
    }

    setFormData({
      brand: "",
      model: "",
      year: "",
      price: "",
      color: "",
      country: "",
      status: "متاح",
    });

    onSuccess();
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >

      <Input
        name="brand"
        placeholder="Brand"
        value={formData.brand}
        onChange={handleChange}
      />

      <Input
        name="model"
        placeholder="Model"
        value={formData.model}
        onChange={handleChange}
      />

      <Input
        name="year"
        placeholder="Year"
        value={formData.year}
        onChange={handleChange}
      />

      <Input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <Input
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleChange}
      />

      <Input
        name="country"
        placeholder="Country"
        value={formData.country}
        onChange={handleChange}
      />

      <Button type="submit">
        Add Car
      </Button>

    </form>
  );
};

export default CarForm;