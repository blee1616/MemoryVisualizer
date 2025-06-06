## Memory Visualizer for C Programming
A web-based interactive tool that helps visualize memory management concepts in C programming, focusing on stack and heap allocation.

## Overview
Memory Visualizer is an educational tool designed to help users understand how memory allocation works in C programming. It provides a visual representation of the stack and heap memory areas and demonstrates how different data types are stored and referenced across these memory regions.

## Features
Visual Memory Representation: Clearly separated stack and heap memory regions
Multiple Data Types: Support for common C data types:
Characters (char)
Integers (int)
Character arrays (char[])
Pointers (char*, int*, char*[])
Memory Allocation Tracking: Visual representation of how memory is allocated and referenced
Pointer Relationships: Visual indication of how pointers in the stack reference data in the heap
Action History: Timeline of all memory operations performed
Descriptive Variable Names: Automatically generated variable names following C naming conventions

## How to Use
Add variables to the stack:

Add a single character
Add an integer
Add a character array (string)
Add variables to the heap with pointers:

Add a character with a pointer in the stack
Add an integer with a pointer in the stack
Add a character array with a pointer in the stack
Observe memory allocation:

## Getting Started
```bash
# Clone the repository
git clone https://github.com/blee1616/MemoryVisualizer.git
```
Open index.html in a web browser
Click the action buttons to add different types of variables to memory
Observe how the memory visualization updates

## Future Enhancements
Memory deallocation (free/delete operations)
Memory leak visualization
Struct and complex data type support
C code generation for the current memory state
Step-by-step execution of C code snippets
