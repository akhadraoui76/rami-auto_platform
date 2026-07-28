import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import CarForm from "./cardForm";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


interface Car {
  id: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  country: string;
  status: "متاح" | "محجوز" | "مباع";
  image: string;
  color: string;
}

const CarTable = () => {

  const [cars, setCars] = useState<Car[]>([]);

  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCar, setSelectedCar] = useState<string | null>(null);

  const [editCar, setEditCar] = useState<Car | null>(null);

  const fetchCars = async () => {

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  setCars(
   data ||[]
  );
};
  useEffect(() => {
    fetchCars();
  }, []);
  const handleDelete = async () => {
    if (!selectedCar) return;
    const { error } = await supabase
      .from("cars")
      .delete()
      .eq("id", selectedCar);
    if (error) {
      console.error(error);
      return;
    }

    setCars((prev) =>
      prev.filter((car) => car.id !== selectedCar)
    );
    setDeleteOpen(false);
    setSelectedCar(null);
  };
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">
            Cars Inventory
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your vehicles
          </p>
        </div>

        <Dialog
          open={addOpen}
          onOpenChange={setAddOpen}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditCar(null);
              }}
            >
              Add Car
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editCar ? "Edit Car" : "Add New Car"}
              </DialogTitle>
            </DialogHeader>
            <CarForm
              car={editCar}
              onSuccess={() => {
                setAddOpen(false);
                setEditCar(null);
                fetchCars();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        {cars.map((car) => (
          <Card
            key={car.id}
            className="overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-48 bg-secondary flex items-center justify-center">
              {car.image ? (
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground">
                  No Image
                </span>
              )}
            </div>
            <CardContent className="p-5">

              <p className="text-sm text-muted-foreground">
                {car.brand}
              </p>
              <h3 className="text-lg font-semibold mt-1">
                {car.model}
              </h3>
              <div className="flex justify-between mt-4 text-sm">
                <span>
                  {car.year}
                </span>
                <span>
                  {car.country}
                </span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">
                  ${Number(car.price).toLocaleString()}
                </span>
                <span
                  className="
                    text-xs         px-3
                    py-1
                    rounded-full
                    bg-green-100
                    text-green-700
                  "
                >
                  {car.status}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2 p-5 pt-0">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setEditCar(car);
                  setAddOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  setSelectedCar(car.id);
                  setDeleteOpen(true);
                }}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open);

          if (!open) {
            setSelectedCar(null);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete Car
            </DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this car?
          </p>


          <div className="flex justify-end gap-3 mt-5">

            <Button
              variant="outline"
              onClick={() => {
                setDeleteOpen(false);
                setSelectedCar(null);
              }}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              Delete
            </Button>


          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarTable;