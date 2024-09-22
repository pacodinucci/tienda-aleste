import axios from "axios";

const URL = "https://api.shipnow.com.ar";

const apiToken = "cc5ghy7uhqYujQQ9cNZ8EHppeQO3VYmpdItx9HwgXSowIN4pNw";

const postShipnowVariant = async (variantData: any) => {
  try {
    const response = await axios.post(`${URL}/variants`, variantData, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Error al crear la variante en Shipnow");
    }
  } catch (error) {
    console.error("Error en postShipnowVariant:", error);
    return null;
  }
};

export default postShipnowVariant;
