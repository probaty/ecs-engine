import type { B2BoxType, PhisicsGS } from "../addons/PhisicsAddon";
import { PositionComponent } from "../components/PositionComponent";
import { RigbodyComponent } from "../components/RigbodyComponent";
import { SizeComponent } from "../components/SizeComponent";
import { createSystem } from "../core/System";

export const RigbodySystem = createSystem<[RigbodyComponent, PositionComponent, SizeComponent], PhisicsGS>(
  [RigbodyComponent, PositionComponent, SizeComponent],
  {
    update(gameState, query) {
      const { world, b2box, pixelsPerMeter } = gameState.physics
      const { b2BodyDef, b2Vec2 } = b2box
      const ZERO = new b2Vec2(0, 0)
      for (const [rig, pos, size] of query) {
        if (!rig.body) {
          const bodyDef = new b2BodyDef()
          const shape = createShape(b2box, [rig, pos, size], pixelsPerMeter)!
          bodyDef.set_position(ZERO)
          setBodyType(bodyDef, b2box, rig)
          const body = world.CreateBody(bodyDef)
          const fixture = createFixture(shape, b2box, rig)
          body.CreateFixture(fixture)
          body.SetTransform(new b2Vec2(pos.x / pixelsPerMeter, pos.y / pixelsPerMeter), 0)
          body.SetLinearVelocity(ZERO)
          rig.body = body
        }

        const position = rig.body.GetPosition()
        console.log(position.y, rig.body.GetTransform());

        pos.x = position.x * pixelsPerMeter
        pos.y = position.y * pixelsPerMeter
      }
    },
  }
)

type ComponentsTurple = [RigbodyComponent, PositionComponent, SizeComponent]

function setBodyType(body: Box2D.b2BodyDef, b2Box: B2BoxType, rig: RigbodyComponent) {
  switch (rig.options.type) {
    case 'dynamic':
      body.set_type(b2Box.b2_dynamicBody)
      body.set_enabled(true)
      body.set_awake(true)
      break;
    case "static":
      body.set_type(b2Box.b2_staticBody)
      break
    case "kinematic":
      body.set_type(b2Box.b2_kinematicBody)
      body.set_enabled(true)
      body.set_awake(true)
      break
  }
}
function createFixture(shape: Box2D.b2Shape, b2Box: B2BoxType, rig: RigbodyComponent) {
  const fixture = new b2Box.b2FixtureDef()
  switch (rig.options.type) {
    case 'dynamic':
      fixture.set_shape(shape)
      fixture.set_density(1)
      fixture.set_friction(0.5)
      return fixture
    case "static":
    case "kinematic":
      fixture.set_shape(shape)
      return fixture
  }
}


function calcLinePos([_, pos, size]: ComponentsTurple, vec2: B2BoxType['b2Vec2'], pm: number) {
  const pos1 = new vec2(pos.x / pm, pos.y / pm)
  const pos2 = new vec2((pos.x + size.width) / pm, (pos.y + size.height) / pm)
  return [pos1, pos2]
}

function createShape(b2box: B2BoxType, [rig, pos, size]: ComponentsTurple, pixelPerMeter: number) {
  switch (rig.options.shape) {
    case 'line': {
      const shape = new b2box.b2EdgeShape()
      const [pos1, pos2] = calcLinePos([rig, pos, size], b2box.b2Vec2, pixelPerMeter)
      shape.SetTwoSided(pos1, pos2)
      return shape
    }
    case "circle": {
      const shape = new b2box.b2CircleShape()
      shape.set_m_radius(size.width / 2 / pixelPerMeter)
      return shape
    }
    case "box": {
      const shape = new b2box.b2PolygonShape()
      shape.SetAsBox(size.width / 2 / pixelPerMeter, size.height / 2 / pixelPerMeter)
      return shape
    }

    case "polygon": {

    }

  }
}

