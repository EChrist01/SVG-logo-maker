// Define a base class for shapes
class Shape {
    constructor(color) {
      this.color = color || "";
    }
  
    setColor(colorVar) {
      this.color = colorVar;
    }
  
    render() {
      throw new Error("render() method must be implemented");
    }
  }
  
  // Define triangle
  class Triangle extends Shape {
    render() {
      return `<polygon points="300, 100 450, 350 150, 350" fill="${this.color}"/>`;
    }
  }
  
  // Define circle
  class Circle extends Shape {
    render() {
      return `<circle cx="300" cy="225" r="80" fill="${this.color}"/>`;
    }
  }
  
  // Define square
  class Square extends Shape {
    render() {
      return `<rect x="220" y="145" width="160" height="160" fill="${this.color}"/>`;
    }
  }
  
  // Export classes
  module.exports = { Triangle, Circle, Square };