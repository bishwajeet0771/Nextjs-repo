"use client";
import React from "react";

type Props = {};

export default function page({}: Props) {
  // class Person {
  //   private static _instance: Person;
  //   constructor() {
  //     if (Person._instance) {
  //       return Person._instance;
  //     }
  //     Person._instance = this;
  //   }
  //   talk() {
  //     return "Taking";
  //   }
  // }
  // Person.prototype.talk = () => {
  //   return "NEW  UPDATED TALK";
  // };
  // Person.prototype.age = 19;

  // const you = new Person();
  // const me = new Person();
  function Person(this: any, name: string) {
    this.name = name;
  }
  const vicky = new (Person as any)("virender");
  console.log(vicky);
  return <div className="mt-[10%]"></div>;
}
