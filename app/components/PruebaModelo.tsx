"use client";

import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

export default function PruebaModelo() {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    const cargarModelo = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/tfmodel/model.json");
        setModel(loadedModel);
        console.log("Modelo cargado ✔");
      } catch (err) {
        console.error("Error cargando el modelo:", err);
      }
    };

    cargarModelo();
  }, []);

  const handlePredict = () => {
    if (!model) return alert("El modelo aún no está listo");
    if (!inputValue) return alert("Escribe un valor");

    const x = parseFloat(inputValue);
    const inputTensor = tf.tensor2d([[x]]);
    const output = model.predict(inputTensor) as tf.Tensor;
    const result = output.dataSync()[0];

    setPrediction(result);

    inputTensor.dispose();
    output.dispose();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Prueba de modelo</h1>
      <p>{model ? "Modelo listo ✔" : "Cargando modelo..."}</p>
      <br />
      <input
        type="number"
        placeholder="Introduce un número"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: 8, border: "1px solid gray", marginRight: 10 }}
      />
      <button
        onClick={handlePredict}
        style={{
          padding: "8px 16px",
          background: "#0070f3",
          color: "white",
          borderRadius: 6
        }}
      >
        Predecir
      </button>
      {prediction !== null && (
        <p style={{ marginTop: 20 }}>
          <b>Resultado:</b> {prediction}
        </p>
      )}
    </div>
  );
}
