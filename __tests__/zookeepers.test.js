const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
  } = require("../lib/zookeepers.js");
  const {zookeepers} = require('../data/zookeepers.json')

  jest.mock('fs')

  test('creates a zookeeper object', () => {
      const zookeeper = createNewZookeeper(
          {name: 'Janet', id: '24jik'},
          zookeepers
      )
      
      expect(zookeeper.name).toBe('Janet')
      expect(zookeeper.id).toBe('24jik')
  })

  test('filters by query', () => {
      const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        }
      ]

      const updatedZookeepers = filterByQuery({age:31}, startingZookeepers)

      expect(updatedZookeepers.length).toEqual(1)
  })

  test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "0",
            name: "Kim",
            age: 28,
            favoriteAnimal: "dolphin"
        },
        {
            id: "1",
            name: "Raksha",
            age: 31,
            favoriteAnimal: "penguin"
        }
      ]
  
    const result = findById("1", startingZookeepers)
  
    expect(result.name).toBe("Raksha")
  });

  test("validates age", () => {
    const zookeeper = {
        id: "1",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin"
    };
  
    const invalidZookeeper = {
        id: "1",
        name: "Raksha",
        age: "31",
        favoriteAnimal: "penguin"
    };
  
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
  
    expect(result).toBe(true);
    expect(result2).toBe(false);
  });