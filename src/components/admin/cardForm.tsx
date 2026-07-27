import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Car {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: string;
  country: string;
  status: string;
  image: string;
  color: string;
}

interface CarFormProps {
  onSuccess: () => void;
  car?: Car | null;
}

const CarForm = ({ onSuccess, car }: CarFormProps) => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    color: "",
    country: "",
    status: "متاح",
  });
  const [image, setImage] = useState<File | null>(null);
  useEffect(() => {
    if (car) {
      setFormData({
        brand: car.brand,
        model: car.model,
        year: String(car.year),
        price: car.price,
        color: car.color,
        country: car.country,
        status: car.status,
      });
    }
  }, [car]);
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
    let imageUrl = car?.image || "";


    // upload image
    if (image) {
      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } = await supabase.storage
        .from("cars")
        .upload(fileName, image);

      if (uploadError) {
        console.error(uploadError);
        return;
      }

      const { data } = supabase.storage
        .from("cars")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }


    let error;

    if (car) {
      const response = await supabase
        .from("cars")
        .update({
          ...formData,
          year: Number(formData.year),
          price: formData.price,
          image: imageUrl,
        })
        .eq("id", car.id);

      error = response.error;

    } else {
      const response = await supabase
        .from("cars")
        .insert([
          {
            ...formData,
            year: Number(formData.year),
            price: formData.price,
            image: imageUrl,
          },
        ]);

      error = response.error;
    }


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

    setImage(null);

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
      <input
        name="image_car"
        type="file"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <Button type="submit">
        {car ? "Update Car" : "Add Car"}
      </Button>

    </form>
  );
};

export default CarForm;