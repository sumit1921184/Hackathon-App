import React, { useEffect, useState } from 'react';
import { Box, Flex, Button, VStack, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.avif";
import h3 from "../assets/h3.jpg";
import h4 from "../assets/h4.avif";
import h5 from "../assets/h5.webp";
import h6 from "../assets/h6.webp";
import { FaChevronCircleLeft, FaChevronCircleRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Carousal({ cards, types }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Dynamically adjust the cards per view
  const cardsPerView = Math.min(cards.length, 2); // Show max 2 cards, adjust based on the available cards
  const cardsImagesLive = [h1, h2, h3, h4, h5, h6];
  const cardImagesPast = [h6,h5,h4,h3,h2,h1];
  const cardImagesUpcoming = [h4,h6,h1,h5,h3,h2]

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + cardsPerView >= cards.length ? 0 : prevIndex + 1
    );
  };

  // Function to handle the previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - cardsPerView : prevIndex - 1
    );
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Auto-slide to the next card
    }, 4000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [currentIndex, cardsPerView]); // Re-run the effect if currentIndex or cardsPerView changes

  return (
    <VStack spacing={4} align="center" p={6}>
      <Flex alignItems="center" justifyContent="space-between" w="100%">
        {/* Previous Button */}
        
        <FaChevronCircleLeft onClick={handlePrev} className=' size-7 cursor-pointer text-blue-950'/>
        

        {/* Card Display */}
        <Flex overflow="hidden" w="full">
          <Flex
            transform={`translateX(-${currentIndex * (100 / cardsPerView)}%)`}
            transition="transform 0.5s ease-in-out"
            width={`${(cards.length / cardsPerView) * 100}%`} // Adjust the width based on the number of cards
          >
            {cards.map((card, ind) => {
              console.log("=-----",types);
              let cardsImages = [];
             if(types == "live"){
                cardsImages = [...cardsImagesLive];
             }
             else if(types == "past"){
              cardsImages = [...cardImagesPast];
             }
             else{
              cardsImages = [...cardImagesUpcoming]
             }
             
              const imageInd = ind % 6; // Loop through images
              return (
                <Box
                  key={card.id}
                  flex={`0 0 ${100 / cardsPerView}%`} // Adjust card width based on cardsPerView
                  p={2}
                  border="1px solid #e2e8f0"
                  borderRadius="md"
                  boxShadow="lg"
                  bg="white"
                  textAlign="center"
                >
                  <Image src={cardsImages[imageInd]} alt={card.title} w="100%" h="150px" objectFit="cover" />
                  <Text mt={4} fontSize="lg" fontWeight="bold">
                    {card.name}
                  </Text>
                  <Text fontSize="sm" mt={2}>
                    {card.description}
                  </Text>
                </Box>
              );
            })}
          </Flex>
        </Flex>

        {/* Next Button */}
        
        <FaChevronCircleRight onClick={handleNext} className=' size-7 cursor-pointer text-blue-950'/>
       
      </Flex>
    </VStack>
  );
}

export default Carousal;
