const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Fitness" },
                { name: "Photography" },
                { name: "Accounting" },
                { name: "Engineering" },
                { name: "Filming" },
                { name: "Art" },
                { name: "History" },
                { name: "Mathematics" },
                { name: "Cooking" },
                { name: "Writing" },
                { name: "Dancing" },
                { name: "Psychology" },
                { name: "Sculpture" },
                { name: "Design" },
                { name: "Architecture" },
                { name: "Gardening" },
                { name: "Physics" },
                { name: "Chemistry" },
                { name: "Biology" },
                { name: "Medicine" },
                { name: "Law" },
                { name: "Philosophy" },
                { name: "Languages" },
                { name: "Literature" },
                { name: "Geography" },
                { name: "Politics" },
                { name: "Economics" },
                { name: "Sociology" },
                { name: "Anthropology" },
                { name: "Astronomy" },
                { name: "Astrophysics" },
                { name: "Meteorology" },
                { name: "Geology" },
                { name: "Environmental Science" },
                { name: "Oceanography" },
                { name: "Botany" },
                { name: "Zoology" },
                { name: "Ethics" },
                { name: "Religion" },
                { name: "Mythology" },
                { name: "Cultural Studies" },
                { name: "Education" },
                { name: "Pedagogy" },
                { name: "Communication" },
                { name: "Marketing" },
                { name: "Advertising" },
                { name: "Management" },
                { name: "Leadership" },
                { name: "Entrepreneurship" },
                { name: "Innovation" },
                { name: "Technology" },
                { name: "Robotics" },
                { name: "Virtual Reality" },
                { name: "Augmented Reality" },
                { name: "Blockchain" },
                { name: "Cryptocurrency" },
                { name: "Cybersecurity" },
                { name: "Data Science" },
                { name: "Machine Learning" },
                { name: "Artificial Intelligence" },
                { name: "Deep Learning" },
                { name: "Neuroscience" },
                { name: "Genetics" },
                { name: "Bioinformatics" },
                { name: "Biotechnology" },
                { name: "Nanotechnology" },
                { name: "Space Exploration" },
                { name: "Aviation" },
                { name: "Marine Biology" },
                { name: "Renewable Energy" },
                { name: "Sustainability" },
                { name: "Urban Planning" },
                { name: "Transportation" },
                { name: "Fashion Design" },
                { name: "Textile Design" },
                { name: "Music Production" },
                { name: "Film Production" },
                { name: "Theater" },
                { name: "Performing Arts" },
                { name: "Visual Arts" },
                { name: "Martial Arts" },
                { name: "Yoga" },
                { name: "Pilates" },
                { name: "Meditation" },
                { name: "Mindfulness" },
                { name: "Spirituality" },
                { name: "Wellness" },
                { name: "Healthcare" },
                { name: "Dentistry" },
                { name: "Nursing" },
                { name: "Pharmacy" },
                { name: "Veterinary Medicine" },
                { name: "Agriculture" },
                { name: "Forestry" },
                { name: "Fishing" },
            ],
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();
