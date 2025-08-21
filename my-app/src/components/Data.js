// ---------- Dog images (8) ----------
import dogBoxer from "../assets/dog/dog_boxer.jpg";
import dogCorgi from "../assets/dog/dog_corgi.jpg";
import dogFrenchBulldog from "../assets/dog/dog_frenchbulldog.jpg";
import dogHusky1 from "../assets/dog/dog_husky.jpg";
import dogHusky2 from "../assets/dog/dog_husky2.jpg";
import dogMaltipoo from "../assets/dog/dog_maltipooch.jpg";
import dogShiba from "../assets/dog/dog_shiba.jpg";
import dogStaffy from "../assets/dog/dog_Staffordshire_Terrier.jpg";

// ---------- Cat images (8) ----------
import catBritish from "../assets/cat/cat_britishshorthair.jpeg";
import catMaine1 from "../assets/cat/cat_maincoon.jpeg";
import catMaine2 from "../assets/cat/cat_mainecoon2.jpeg";
import catRagdoll1 from "../assets/cat/cat_ragdoll.avif";
import catRagdoll2 from "../assets/cat/cat_ragdoll2.avif";
import catSiamese from "../assets/cat/cat_siamese.jpeg";
import catTabby1 from "../assets/cat/cat_tabby.jpeg";
import catTabby2 from "../assets/cat/cat_tabby2.avif";

// ---------- Dogs (2 not adoptable) ----------
export const adoptionDogs = [
    { id: "adog-001", name: "Max", breed: "Boxer", age: 3, adoptable: true, image: dogBoxer },
    { id: "adog-002", name: "Bella", breed: "Pembroke Welsh Corgi", age: 2, adoptable: true, image: dogCorgi },
    { id: "adog-003", name: "Gus", breed: "French Bulldog", age: 4, adoptable: true, image: dogFrenchBulldog },
    { id: "adog-004", name: "Koda", breed: "Siberian Husky", age: 1, adoptable: true, image: dogHusky1 },
    { id: "adog-005", name: "Nova", breed: "White Shepherd", age: 5, adoptable: false, image: dogHusky2 },   // not adoptable
    { id: "adog-006", name: "Pip", breed: "Maltipoo", age: 2, adoptable: true, image: dogMaltipoo },
    { id: "adog-007", name: "Momo", breed: "Shiba Inu", age: 6, adoptable: true, image: dogShiba },
    { id: "adog-008", name: "Rex", breed: "Staffordshire Terrier", age: 7, adoptable: false, image: dogStaffy },   // not adoptable
];

// ---------- Cats (2 not adoptable) ----------
export const adoptionCats = [
    { id: "acat-001", name: "Bella", breed: "British Shorthair", age: 1, adoptable: true, image: catBritish },
    { id: "acat-002", name: "Juniper", breed: "Maine Coon", age: 3, adoptable: true, image: catMaine1 },
    { id: "acat-003", name: "Paws", breed: "Maine Coon", age: 2, adoptable: true, image: catMaine2 },
    { id: "acat-004", name: "Pumpkin", breed: "Ragdoll", age: 4, adoptable: false, image: catRagdoll1 },  // not adoptable
    { id: "acat-005", name: "Snow", breed: "Ragdoll", age: 2, adoptable: true, image: catRagdoll2 },
    { id: "acat-006", name: "Skye", breed: "Siamese", age: 6, adoptable: true, image: catSiamese },
    { id: "acat-007", name: "Whisk", breed: "Tabby (Domestic SH)", age: 5, adoptable: true, image: catTabby1 },
    { id: "acat-008", name: "Ginger", breed: "Tabby (Domestic SH)", age: 3, adoptable: false, image: catTabby2 },    // not adoptable
];

// Combined (if you want one array to map over)
export const adoptionAll = [
    ...adoptionDogs.map(p => ({ ...p, species: "dog" })),
    ...adoptionCats.map(p => ({ ...p, species: "cat" })),
];

// DOGS – age in YEARS (1–16)
export const dogs = [
    { id: "dog-max", name: "Max", gender: "Male", age: 3 },
    { id: "dog-luna", name: "Luna", gender: "Female", age: 1 },
    { id: "dog-charlie", name: "Charlie", gender: "Male", age: 6 },
    { id: "dog-daisy", name: "Daisy", gender: "Female", age: 2 },
    { id: "dog-cooper", name: "Cooper", gender: "Male", age: 4 },
    { id: "dog-molly", name: "Molly", gender: "Female", age: 8 },
    { id: "dog-rocky", name: "Rocky", gender: "Male", age: 5 },
    { id: "dog-sadie", name: "Sadie", gender: "Female", age: 7 },
    { id: "dog-buddy", name: "Buddy", gender: "Male", age: 9 },
    { id: "dog-zoe", name: "Zoe", gender: "Female", age: 1 },
    { id: "dog-milo", name: "Milo", gender: "Male", age: 2 },
    { id: "dog-ruby", name: "Ruby", gender: "Female", age: 10 },
    { id: "dog-finn", name: "Finn", gender: "Male", age: 3 },
    { id: "dog-nala", name: "Nala", gender: "Female", age: 4 },
    { id: "dog-leo", name: "Leo", gender: "Male", age: 12 },
    { id: "dog-piper", name: "Piper", gender: "Female", age: 2 },
    { id: "dog-duke", name: "Duke", gender: "Male", age: 1 },
    { id: "dog-coco", name: "Coco", gender: "Female", age: 3 },
    { id: "dog-oscar", name: "Oscar", gender: "Male", age: 14 },
    { id: "dog-stella", name: "Stella", gender: "Female", age: 5 },
];

// CATS – age in YEARS (1–16)
export const cats = [
    { id: "cat-bella", name: "Bella", gender: "Female", age: 1 },
    { id: "cat-oliver", name: "Oliver", gender: "Male", age: 2 },
    { id: "cat-luna", name: "Luna", gender: "Female", age: 3 },
    { id: "cat-simba", name: "Simba", gender: "Male", age: 1 },
    { id: "cat-chloe", name: "Chloe", gender: "Female", age: 6 },
    { id: "cat-jasper", name: "Jasper", gender: "Male", age: 2 },
    { id: "cat-willow", name: "Willow", gender: "Female", age: 8 },
    { id: "cat-theo", name: "Theo", gender: "Male", age: 1 },
    { id: "cat-nala", name: "Nala", gender: "Female", age: 10 },
    { id: "cat-cleo", name: "Cleo", gender: "Female", age: 2 },
    { id: "cat-leo", name: "Leo", gender: "Male", age: 1 },
    { id: "cat-mochi", name: "Mochi", gender: "Female", age: 3 },
    { id: "cat-tigger", name: "Tigger", gender: "Male", age: 12 },
    { id: "cat-misty", name: "Misty", gender: "Female", age: 5 },
    { id: "cat-salem", name: "Salem", gender: "Male", age: 4 },
    { id: "cat-pepper", name: "Pepper", gender: "Female", age: 2 },
    { id: "cat-poppy", name: "Poppy", gender: "Female", age: 1 },
    { id: "cat-felix", name: "Felix", gender: "Male", age: 7 },
    { id: "cat-suki", name: "Suki", gender: "Female", age: 3 },
    { id: "cat-shadow", name: "Shadow", gender: "Male", age: 13 },
];


export const pets = [
    ...dogs.map(p => ({ ...p, species: "dog" })),
    ...cats.map(p => ({ ...p, species: "cat" })),
];
