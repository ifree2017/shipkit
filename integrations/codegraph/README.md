# CodeGraph Integration

CodeGraph is ShipKit's code evidence layer. It helps answer impact questions:

- Which files implement a requirement?
- Which modules depend on this API?
- Which tests should run after this change?
- What is the blast radius of a refactor?

This integration is tool-agnostic. Any code graph implementation can write files matching `graph-schema.yaml`.
