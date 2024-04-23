"use client";

import { Category } from "@prisma/client";
import {
    FcEngineering,
    FcFilmReel,
} from "react-icons/fc";
import { FaAtom,FaBitcoin, FaBalanceScale, FaBook, FaBookOpen, FaBrain, FaBullhorn, FaCity, FaDraftingCompass, FaFirstAid, FaFlask, FaGlobe, FaHammer, FaLanguage, FaLeaf, FaRegLightbulb, FaTrophy } from "react-icons/fa";
import { GiAfrica, GiBank, GiBiohazard, GiBlackHoleBolas, GiBrain, GiCircuitry, GiConversation, GiCrownedSkull, GiCyberEye, GiDna1, GiDogHouse, GiElectric, GiFilmProjector, GiFishbone, GiGreenhouse, GiHighHeel, GiHorseHead, GiJusticeStar, GiLotus, GiMedicinePills, GiMeditation, GiMedusaHead, GiMegaphone, GiMicroscope, GiNanoBot, GiNurseFemale, GiOctopus, GiPalette, GiPaperPlane, GiPrayer, GiProcessor, GiRobberMask, GiRobotAntennas, GiRock, GiSolarPower, GiSolarSystem, GiSpaceSuit, GiStethoscope, GiStrongMan, GiTalk, GiTeacher, GiTheaterCurtains, GiTicket, GiTooth, GiTornado, GiTrafficLightsGreen, GiTreeBranch, GiVote, GiVrHeadset, GiWheat,GiGreekSphinx,GiForest,GiYinYang } from "react-icons/gi";
import { BiMath,BiDumbbell, BiDollar, BiPen, BiBriefcase, BiRocket } from "react-icons/bi";
import { TbNeedleThread,TbAugmentedReality } from "react-icons/tb";
import {FiCode,FiCamera} from "react-icons/fi"
import { PiStudent } from "react-icons/pi";
import {FaMusic } from "react-icons/fa"
import { IoIosColorPalette, IoIosLeaf, IoMdRestaurant} from "react-icons/io";
import { SiBlockchaindotcom,SiBytedance } from "react-icons/si";
import { LiaRobotSolid,LiaCitySolid } from "react-icons/lia";
import { LuBrainCircuit } from "react-icons/lu";
import { FaHandFist } from "react-icons/fa6";
import { IconType } from "react-icons";

import React from "react";

type CategoriesProps = {
    items: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
 "Computer Science": FiCode,
 "Music": FaMusic,
 "Fitness": BiDumbbell,
 "Photography": FiCamera,
 "Accounting": BiDollar,
 "Engineering": FcEngineering,
 "Filming": FcFilmReel,
 "Art": IoIosColorPalette,
 "History": FaBook,
 "Mathematics": BiMath,
 "Cooking": IoMdRestaurant,
 "Writing": BiPen,
 "Dancing": SiBytedance,
 "Psychology": FaBrain,
 "Sculpture": FaHammer,
 "Design": FaDraftingCompass,
 "Architecture": FaCity,
 "Gardening": IoIosLeaf,
 "Physics": FaAtom,
 "Chemistry": FaFlask,
 "Biology": GiDna1,
 "Medicine": FaFirstAid,
 "Law": FaBalanceScale,
 "Philosophy": FaRegLightbulb,
 "Languages": FaLanguage,
 "Literature": FaBookOpen,
 "Geography": FaGlobe,
 "Politics": GiVote,
 "Economics": GiBank,
 "Sociology": GiConversation,
 "Anthropology": GiAfrica,
 "Astronomy": GiSolarSystem,
 "Astrophysics": GiBlackHoleBolas,
 "Meteorology": GiTornado,
 "Geology": GiRock,
 "Environmental Science": GiGreenhouse,
 "Oceanography": GiOctopus,
 "Botany": GiTreeBranch,
 "Zoology": GiHorseHead,
 "Ethics": GiJusticeStar,
 "Religion": GiPrayer,
 "Mythology": GiMedusaHead,
 "Cultural Studies": GiGreekSphinx,
 "Education": GiTeacher,
 "Pedagogy": PiStudent,
 "Communication": GiTalk,
 "Marketing": FaBullhorn,
 "Advertising": GiMegaphone,
 "Management": BiBriefcase,
 "Leadership": FaTrophy,
 "Entrepreneurship": GiCrownedSkull,
 "Innovation": BiRocket,
 "Technology": GiCircuitry,
 "Robotics": GiRobotAntennas,
 "Virtual Reality": GiVrHeadset,
 "Augmented Reality": TbAugmentedReality,
 "Blockchain": SiBlockchaindotcom,
 "Cryptocurrency": FaBitcoin,
 "Cybersecurity": GiCyberEye,
 "Data Science": GiProcessor,
 "Machine Learning": LiaRobotSolid,
 "Artificial Intelligence": GiRobberMask,
 "Deep Learning": LuBrainCircuit,
 "Neuroscience": GiBrain,
 "Genetics": GiDna1,
 "Bioinformatics": GiBiohazard,
 "Biotechnology": GiMicroscope,
 "Nanotechnology": GiNanoBot,
 "Space Exploration": GiSpaceSuit,
 "Aviation": GiPaperPlane,
 "Marine Biology": GiOctopus,
 "Renewable Energy": GiSolarPower,
 "Sustainability": GiForest,
 "Urban Planning": LiaCitySolid,
 "Transportation": GiTrafficLightsGreen,
 "Fashion Design": GiHighHeel,
 "Textile Design": TbNeedleThread,
 "Music Production": GiElectric,
 "Film Production": GiFilmProjector,
 "Theater": GiTicket,
 "Performing Arts": GiTheaterCurtains,
 "Visual Arts": GiPalette,
 "Martial Arts": FaHandFist,
 "Yoga": GiLotus,
 "Pilates": GiYinYang,
 "Meditation": GiPrayer,
 "Mindfulness": GiBrain,
 "Spirituality": GiMeditation,
 "Wellness": GiStrongMan,
 "Healthcare": GiStethoscope,
 "Dentistry": GiTooth,
 "Nursing": GiNurseFemale,
 "Pharmacy": GiMedicinePills,
 "Veterinary Medicine": GiDogHouse,
 "Agriculture": GiWheat,
 "Forestry": GiTreeBranch,
 "Fishing": GiFishbone,

};

const Categories = ({ items }: CategoriesProps) => {
    return <div>Categories</div>;
};

export default Categories;
